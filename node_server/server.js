let express = require('express');
let app = express();
// let cors = require('cors');

// app.use(cors());


const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
let translatedText="yet to get text";

// const languageTranslator = new LanguageTranslatorV3({

//   version: '',

//   authenticator: new IamAuthenticator({
  
//     apikey: '',
//   }),
//   serviceUrl: '',
  
// //  disableSslVerification: true,
// });



const io = require(`socket.io`)(8000);

console.log(`video call server started at 8000`);

let users={};

// let model_lang= {
//   "English" :"en-hi",
//   "हिन्दी" : "hi-en"
// }

let model_lang ={
  "en-IN":"en-hi",
  "hi-IN":"hi-en"
}

io.on('connection' , socket =>{
    
    socket.on('new' , name => {
        console.log('new-user is' , name,"\n");
        users[socket.id] = name;
        
        socket.broadcast.emit('lets-start', name );
    });

    // Data received from the each client
    socket.on(`send-to-server` , data=>{

        //Data in same language from client is printed on colsole
        console.log("Data of user ",users[socket.id]," is ",data.FT ,"and laguage of client is ",data.language,"\n");

        // Passing the data to language translator model to get translated text
        const translateParams = {
            text: data.FT,
            modelId: model_lang[data.language],
          };

          console.log(" The text to be translated is ",translateParams.text , "and language model is ",model_lang[data.language]);
          
          // languageTranslator.translate(translateParams)
          //   .then(translationResult => {
          //       // Translated text will be shown on server and 
          //       translatedText= translationResult["result"]["translations"][0]["translation"];
          //       console.log(translatedText);
          
          //       // Then broadcasted to other users
                socket.broadcast.emit(`client-receive` , {F:translatedText  , user :users[socket.id] })
            
          //   })
          //   .catch(err => {
          //     console.log('error:', err);
          //   });
   
    })

});
