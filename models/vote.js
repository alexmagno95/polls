module.exports = function(mongoose) {
  
  var VoteSchema = new mongoose.Schema({
    poll: {
      "type": String,
      "default": ""
    },
    chosen: {
      "type": String
    },
    ip: {
      "type": String
    },
    date: {
      "type": Date,
      "default": Date.now
    }
  });

  return mongoose.model("Vote", VoteSchema);

};
