const EventEmitter = require('events');
const fs = require('fs');
//const path = require('path');
//const dateFormat = require("dateformat");


class  Logger extends EventEmitter {
//      var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss TT");

        log(uuid,req,rep){
				var data =
                {
                        Refno : uuid,
                        request : req,
                        response : resp
                }
			
				fs.appendFile('APILog.txt',data,err => {
                if (err) throw err;
                });
				
                this.emit('APILog','done'
                                            
                
				
                );

        }
        }

module.exports = Logger;
