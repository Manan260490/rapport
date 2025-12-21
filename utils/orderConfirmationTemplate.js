module.exports = orderConfirmationTemplate = (
  serviceName,
  name,
  companyName,
  address,
  state,
  city,
  plan,
  amount
) => {
  let mailBody = `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" dir="ltr">
   <head>
      <title>Dear ${name}</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
         #outlook a{padding: 0;}
         .ReadMsgBody{width: 100%;}
         .ExternalClass{width: 100%;}
         .ExternalClass *{line-height: 100%;}
         body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
         table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
         img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
         p{display: block; margin: 13px 0;}
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
         @media only screen and (max-width:480px) {
         @-ms-viewport {width: 320px;}
         @viewport {	width: 320px; }
         }
      </style>
      <!--<![endif]-->
      <!--[if mso]>
      <xml>
         <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if lte mso 11]>
      <style type="text/css">
         .outlook-group-fix{width:100% !important;}
      </style>
      <![endif]-->
      <style type="text/css">
         @media only screen and (max-width:480px) {
         }
         @media only screen and (min-width:480px) {
         .dys-column-per-100 {
         width: 100.000000% !important;
         max-width: 100.000000%;
         }
         }
         a {color: #0000EE;text-decoration: underline;}
      </style>
      <!--[if !mso]><!-->
      <link href='https://fonts.googleapis.com/css?family=Martel:300,400,700,900&display=swap' rel='stylesheet' type='text/css'>
      <style type='text/css'>@import url(https://fonts.googleapis.com/css?family=Martel:300,400,700,900&display=swap);</style>
      <!--<![endif]-->
   </head>
   <body style="background-color: #FFFFFF;">
      <span style="width:0;opacity:0;max-height:0;mso-hide:all;overflow:hidden;float:left;display:none !important;">Greetings from Rapport HR Solutions - Technology driven HR & PF ESI Consultant! </span><span style="display: none; max-height: 0px; overflow: hidden;">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</span>
      <div style="background-color: #FFFFFF;">
         <!--[if mso | IE]>
         <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:700px;" width="700">
            <tr>
               <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                  <![endif]-->
                  <div style='margin:0px auto;max-width:700px;'>
                     <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                        <tbody>
                           <tr>
                              <td style='direction:ltr;font-size:0px;padding:10px 20px;text-align:center;vertical-align:top;'>
                                 <!--[if mso | IE]>
                                 <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                       <td style="vertical-align:top;width:700px;">
                                          <![endif]-->
                                          <div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                                             <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                                                <tr>
                                                   <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                                      <div style='color:#121212;font-family:Martel, Helvetica, Arial, sans-serif;font-size:18px;font-weight:light;line-height:28px;text-align:left;'>
                                                         <p style="margin-top:0;margin-bottom:0">Dear ${name},<br/><br/>Greetings from Rapport HR Solutions - Technology driven HR &amp; PF ESI Consultant! <br/><br/>Thank you for choosing Rapport HR as your compliance partner! A dedicated compliance manager will get in touch with you soon to ensure a seamless experience and quality service.</p>
                                                         <p style="margin-top:0;margin-bottom:0">​</p>
																													<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>&nbsp;</strong></p>
																												<table style="border-collapse:collapse;border:none;">
																													<tbody>
																															<tr>
																																<td colspan="2" style="width: 467.5pt;border: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style="font-size:21px;">Order Summary - <span style="color:red;">${serviceName}</span></span></strong></p>
																																</td>
																															</tr>
																															<tr>
																																<td style="width: 233.75pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>Name</strong></p>
																																</td>
																																<td style="width: 233.75pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>${name}</strong></p>
																																</td>
																															</tr>
																															<tr>
																																<td style="width: 233.75pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>Company Name</strong></p>
																																</td>
																																<td style="width: 233.75pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>${companyName}</strong></p>
																																</td>
																															</tr>
																															<tr>
																																<td style="width: 233.75pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>Complete Billing Address</strong></p>
																																</td>
																																<td style="width: 233.75pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>${address}</strong></p>
																																</td>
																															</tr>
																															<tr>
																																<td style="width: 233.75pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>State, City</strong></p>
																																</td>
																																<td style="width: 233.75pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>${state}, ${city}</strong></p>
																																</td>
																															</tr>
																															<tr>
																																<td style="width: 233.75pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>Plan Name</strong></p>
																																</td>
																																<td style="width: 233.75pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>${plan}</strong></p>
																																</td>
																															</tr>
																															<tr>
																																<td style="width: 233.75pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>Amount Paid (Incl. GST)</strong></p>
																																</td>
																																<td style="width: 233.75pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;vertical-align: top;">
																																		<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>${amount}</strong></p>
																																</td>
																															</tr>
																													</tbody>
																												</table>
																												<p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'><strong>&nbsp;</strong></p>
                                                         <p style="margin-top:0;margin-bottom:0">​</p>
                                                         <p style="margin-top:0;margin-bottom:0">Warm regards,<br/>Team, Rapport HR<br/><a href="https://rapporthr.in/">Start a Business</a> |<a href="https://rapporthr.in/">Licenses / Registration</a>| <a href="https://rapporthr.in/">Labour Laws Compliance</a> |<a href="https://rapporthr.in/">HR &amp; Technology</a><br/>M: 9599553911 | <a href="https://rapporthr.in/">rapporthr.in</a><br/>* Terms &amp; Conditions<br/><br/><br/></p>
                                                      </div>
                                                   </td>
                                                </tr>
                                             </table>
                                          </div>
                                          <!--[if mso | IE]>
                                       </td>
                                    </tr>
                                 </table>
                                 <![endif]-->
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <!--[if mso | IE]>
               </td>
            </tr>
         </table>
         <![endif]-->
      </div>
   </body>
</html>`;
  return mailBody;
};
