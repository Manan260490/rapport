const request = require("request");
module.exports = messagingClient = async (customerNumber, message, template_id_client) => {
  let sender_id = "RprtHR";
  let key = "353931AKdF6s6M602388b2P1";

  //sending messsage to client
  request(
    `http://www.mysmscenter.com/api/sendhttp.php?authkey=${key}&mobiles=+91${customerNumber}&message=${message}&sender=${sender_id}&DLT_TE_ID=${template_id_client}&route=4&response=json`,
    function (error, response, body) {
      console.error("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
};
