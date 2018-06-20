# Fake API
Javascript library to make Fake API like make a Real API. YOU DON'T NEED SERVER! The proccess is very simple, Define the Routes then make a fake request to the route. It also has a progress demonstration, give it some delay and progress before it serves the Data. You can combine it with [fake file uploading](https://github.com/BosNaufal/react-file-base64). Its writing style is inspired by [Laravel Routing](https://laravel.com/docs/5.1/routing) butt not as complex as Laravel does. It only support slashes URL, e.g. "/my/post/add/{user}/{time}".

It just maximizes the use of LocalStorage. So, the data will be stored in the LocalStorage. It's not a big deal, but It's enough to entertain the user or just show your simple demo App.

## Demo
I will make some web clone for the DEMO. So, just wait for it! or just try it now!

## Motivation
It's just a perfection from [Fake AJAX](https://github.com/BosNaufal/fake-ajax). I built this for simplify the prototyping process, so I don't need to much effort to make a simple prototype to show to the clients before starting some projects.

## Install
You can import [Fake API](./src/js/index.js) to your project file process it with your preprocessor.

You can install it via NPM
```bash
npm install fake-api
```


## Usage
```javascript

import FakeAPI from 'fake-api';


// Make a New API for GET Method
FakeAPI.add('GET','/post/{postId}/comments/{commentId}', (args) => {
  let { database } = args
  return database.get()
})


// Make a New API for POST
FakeAPI.add('POST','/post/{postId}', (args) => {
  
  // Check The passing data
  console.log(args)

  // Destructure
  let { database } = args

  // Be Careful, It will replace your data
  database.set({ hai: "woy" })
  // The data now is { hai: "woy" }

  // So, you need to assigned it before place it
  let data = database.get()
  let newData = database.assign(data,{ hai: "hai", halo: "bro" })

  // set new data
  database.set(newData)
  // The data now is { hai: "hai", halo: "bro" }

  // Get the datas
  return database.get()
})


// Make a Request, Just like the Jquery AJAX request
FakeAPI.ajax({
  url: '/post/1',
  method: "POST",
  data: { id: 1 },
  progress(percent){
    console.log(percent);
  },
  done(data){
    console.log(data);
  }
})

// ===========================================
// JUST TRY IT! THEN SEND ME AN ISSUE! :D
// =======================================

```

## FakeAPI.add(method, url, callback)
To adding some API routes

##### method (string)
The Request Methods


##### url (string)
The routing url where you will process your data. The format is just like [Laravel Routing](). 

```javascript
"/slashes/only/{param}/{shouldBeInBrackets}"
```


##### callback (function)
You should return some data when the request come to the route. it will pass one arguments which contain ```FakeDatabase```, ```data```, ```Route Params```

```javascript
// Make a New API for POST
FakeAPI.add('POST','/post/{postId}', (args) => {
  
  // Check The passing data
  console.log(args)

})
```


## FakeDatabase
Once you make a new Route, you should see the FakeDatabase is passed to your callback route arguments. The FakeDatabase have some method.


##### get()
To get All the data from the store (LocalStorage)

```javascript
FakeAPI.add('GET', '/the/url', (args) => {
  let { database } = args 

  let yourAllData = database.get()

  return yourAllData
})
```


##### set(newData)
Set the Data but don't forget it will REPLACE your data, so if you want to update some value, you should do it like the example above.

```javascript
FakeAPI.add('GET', '/the/url', (args) => {
  let { database } = args 

  let yourAllData = database.get() //bunch of data {}

  // mutate your data
  database.set({ newData: "halo" })

  return database.get() // { newData: "halo"  }
})
```


##### assign(target, newData)
You will need this, I think. this method for assign the new data, it means if the new data doesn't exist in the target object, it will add it. Yet, if the data already there (Not Updated) the data will be the same. This method, help you to make some update to the FakeDatabase.

```javascript
FakeAPI.add('POST','/post/{postId}', (args) => {
  
  // Destructure
  let { database } = args

  // Be Careful, It will replace your data
  database.set({ bro: "brother", hai: "woy" })
  // The data now is { hai: "woy" }

  // So, you need to assigned it before place it
  let data = database.get()
  let newData = database.assign(data,{ hai: "hai", halo: "bro" })

  // set new data
  database.set(newData)
  // The data now is { bro: "brother", hai: "hai", halo: "bro" }

  // Get the datas
  return database.get()
})
```


## FakeAPI.ajax({ args })

##### url (string)
The routing url where you will process your data.


##### method (string)
The Request Methods


##### data (object)
The object will passed to the requested route.

##### duration (number)
Milisecond Duration for the delay before serve the data. The Default is random number between 1000 - 3000 Milisecond.

##### progress (function)
The Callback function on the progress event

##### done (function)
The callback function when the process is done

##### Writing
```javascript
// Fake API
FakeAPI.ajax({
  url: "/try/",
  method: "POST", // Uppercase
  data: { }, // Object
  duration: 1000, // Number
  progress: (percent) => { }, // The data for progress bar
  done: (data) => { }, // The Requested Data
})
```

## Thank You for Making this useful~
AND PLEASE DON'T BE FAKE :D

## Let's talk about some projects with me
Just Contact Me At:
- Email: [bosnaufalemail@gmail.com](mailto:bosnaufalemail@gmail.com)
- Skype Id: bosnaufal254
- twitter: [@BosNaufal](https://twitter.com/BosNaufal)

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2016 - forever Naufal Rabbani
