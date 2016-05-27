let internalStorage = {}

class FakeDatabase {

  constructor() {
    this.get()
    return this
  }


  /**
    Get the localStorage data then put it on private variable
  */
  get(){
    if(localStorage.fakeAPI) {
      this.data = JSON.parse(localStorage.fakeAPI)
      return this.data
    }
  }


  /**
    Set the localStorage data then put it on private variable
  */
  set(obj){
    this.data = JSON.stringify(obj)
    localStorage.fakeAPI = this.data
    return this.data
  }


  /**
    Simple Assign function
  */
  assign(source,newData){
    // ASSIGN! Yeey!
    let keys = Object.keys(source)
    let newDataKeys = Object.keys(newData)
    for (let index in keys) {
      for (let indexNew in newDataKeys) {
        let sourceKey = keys[index]
        let newDataKey = newDataKeys[indexNew]
        if(sourceKey === newDataKey) source[sourceKey] = newData[newDataKey]
        else source[newDataKey] = newData[newDataKey]
      }
    }
    return source
  }

}

export default FakeDatabase;
