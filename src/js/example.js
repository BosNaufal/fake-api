
import FakeAPI from './'

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
