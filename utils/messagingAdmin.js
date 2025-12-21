const request = require("request");
module.exports = messagingAdmin = async (adminMessage, template_id_admin) => {
  let adminContact = "+919599553911,+919582003311";
  let sender_id = "RprtHR";
  let key = "353931AKdF6s6M602388b2P1";

  //sending message to admin
  request(
    `http://www.mysmscenter.com/api/sendhttp.php?authkey=${key}&mobiles=${adminContact}&message=${adminMessage}&sender=${sender_id}&DLT_TE_ID=${template_id_admin}&route=4&response=json`,
    function (error, response, body) {
      console.error("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
};
