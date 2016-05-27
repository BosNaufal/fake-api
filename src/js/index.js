
 /*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * 
 *  fake-api @Version 0.0.1
 *
 *
 */

import Database from './storage.js';
import { makeProgress, getRandomDuration } from './utils.js';

let routes = []

class Router {

  constructor(args) {
    this.args = args
    return this
  }

  // Add new Route
  addRoute(){
    let route = {}
    route.url = this.args.url
    route.method = this.args.method
    route.response = this.args.response

    if(routes.length !== 0) {
      routes.forEach((item) => {
        if(item.url === route.url && item.method === route.method) console.warn("[Fake API]: The route has been defined before");
      })
    }

    // Define the block
    let regex = new RegExp('\/[a-zA-Z0-9|\{a-zA-Z0-9\}]+','gi')

    let routeRegex = []
    let pass = []
    let blocks = []
    let matchy;
    while(matchy = regex.exec(route.url)){
      // Separated the blocks
      let block = matchy[0].substr(1)
      blocks.push(block)

      // Make a Regex
      let variable = block.indexOf('{')
      let isVariable = variable !== -1
      if(isVariable) {
        routeRegex.push('[\\w\\W]+')
        pass.push(true)
      }
      else {
        routeRegex.push('\\/'+block+'\\/')
        pass.push(false)
      }
    }

    // Regex has been made
    route.regex = routeRegex.join('')
    route.pass = pass
    route.blocks = blocks

    routes.push(route)
  }


  // Find Match Route and Do a callback!
  findMatch(){
    let { data, done, url, method } = this.args

    // Find the destination
    let destination = {}
    routes.forEach((route) => {
      let regex = new RegExp(route.regex, 'ig')
      let match = url.match(regex)

      // Check Match and the method
      if(match && route.method === method) destination = route
    })

    // If destination is not found
    if(!destination.url) return console.warn("[Fake API]: The route is not found");


    else {

      // Define the block
      let regex = new RegExp('\/[a-zA-Z0-9]+','gi')

      let blocks = []
      let matchy;
      while(matchy = regex.exec(url)){
        // Separated the blocks
        let block = matchy[0].substr(1)
        blocks.push(block)
      }


      // Find the variables should pass to the callback
      let args = {}
      for (var i = 0; i < destination.pass.length; i++) {
        if(destination.pass[i]) {
          let argName = destination.blocks[i].replace(/\{|\}/ig,'')
          let notNumber = isNaN(parseFloat(blocks[i]))
          if(notNumber) args[argName] = blocks[i]
          else args[argName] = parseFloat(blocks[i])
        }
      }

      // Passing Data From AJAX request
      if(data) args.req = data

      // Make new Database
      args.database = new Database()

      // Get the Data and Bind the callback
      if(typeof destination.response === "function") return done(destination.response(args))
      else return console.warn("[Fake API]: The route has no callback function");

    }

  }

  // Static method to add new Route
  static add(method, url, response){
    return new Router({ method, url, response }).addRoute()
  }

  // Static method to make Fake Ajax Call
  static ajax(args) {
    let { url, method, duration, progress, done, data } = args

    // method "GET" as default
    method = method ? method : "GET"

    // Make new Instance
    let fake;
    if(data) fake = new FakeAPI({ url, method, done, data })
    else fake = new FakeAPI({ url, method, done })

    // DO IT!
    return makeProgress(duration ? duration : getRandomDuration(), (percent) => progress ? progress(percent) : false, () => fake.findMatch() )
  }

}


let FakeAPI = Router
export default FakeAPI; 
