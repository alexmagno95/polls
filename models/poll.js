module.exports = function(mongoose) {
  
  var PollSchema = new mongoose.Schema({
    title: {
      "type": String,
      "default": ""
    },
    question: {
      "type": String,
      "default": ""
    },
    choices: [{ type: String }],
    date: {
      "type": Date,
      "default": Date.now
    }
  });

  return mongoose.model("Poll", PollSchema);

};

