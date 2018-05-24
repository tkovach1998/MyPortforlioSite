<?php
$errorMSG = "";
/// 1. name
if (empty($_POST["fullname"])) {
$errorMSG = "Name is required ";
} else {
$name = $_POST["fullname"];
}
// 2. EMAIL
if (empty($_POST["email"])) {
$errorMSG .= "Email is required ";
} else {
$email = $_POST["email"];
}
$formID = $_POST["formID"];
$county = $_POST["county"];
$ordinance = $_POST["ordinance"];
$repcontact = $_POST["repcontact"];

switch ($formID) {
case 'generalLetter':
$message = "
<p>Hello,</p>
<p>As a resident of " . $county . ", I&rsquo;m writing to respectfully express my concern for the " . $ordinance . " under consideration.</p>
<p>These restrictions will cause more harm than good in our community in multiple ways, including:</p>
<ul>
  <li>Driving business to surrounding communities that do not have the same tobacco restrictions.</li>
  <li>Providing surrounding businesses an unfair competitive advantage by banning my business from selling legal tobacco products to legal age consumers.</li>
  <li>Forcing police departments to regulate a new tobacco ordinance while issues with opioid abuse and homicide continue to plague the U.S.</li>
  <li>Opening up an opportunity for criminals to sell tobacco products illegally on the black market, which can result in an increase in crime, violence and youth access to tobacco products.</li>
</ul>
<p>Additionally, these ordinances limit the freedoms and choices of legal adults who can get married, serve our country and vote for leaders, such as yourself.</p>
<p>While I understand the concern for public health, please rest assured we only sell legal tobacco products to legal age adults. In fact, our staff goes through extensive training to keep tobacco products away from underage individuals. </p>
<p>We are doing our part to be responsible members of the local business community by responsibly selling legal tobacco products to adults. I am in favor of any laws that will benefit the public health, but I can&rsquo;t support an ordinance that doesn&rsquo;t support my livelihood. </p>
<p>For the sake of " . $county . " community and local businesses, please vote &ldquo;no&rdquo; on the " . $ordinance . " under consideration.</p>
<p>Please contact me if you have any questions.</p>
<p>Thank you, " . $name . "</p>
";
break;
case 'flavorLetter':
$message = "
<p> Hello,</p>
<p>
As a resident of " . $county . ", I’m writing to respectfully express my concern for the " . $ordinance . " under consideration </p>
<p>
This ordinance will cause more harm than good in our community in multiple ways, including:</p>
<ul>
  <li>Driving business to surrounding communities that are still allowed to sell flavored tobacco products, which gives them an unfair competitive advantage.</li>
  <li>Providing surrounding businesses an unfair competitive advantage by forcing us to sell our products at a higher price.</li>
  <li>Forcing police departments to regulate a new tobacco ordinance while issues with opioid abuse and homicide continue to plague our country.</li>
  <li>Opening up an opportunity for criminals to sell the newly banned flavored tobacco products illegally on the black market, which can result in an increase in crime and violence, without reducing youth access.</li>
</ul>
<p>
Additionally, this ordinance limits the freedoms and choices of legal adults who can get married, serve our country and vote for leaders, such as yourself.  </p>
<p>While I understand the concern of youth tobacco use, please rest assured we do not sell tobacco to minors. In fact, we go through extensive training to keep tobacco products away from underage individuals. </p>
<p>
  We are doing our part to keep tobacco out of the hands of our community’s youth by not selling to minors. I am in favor of any laws that will keep children from using tobacco, but I can’t support an ordinance that doesn’t support my livelihood.
</p>
<p>For the sake of " . $county . " community and local businesses, please vote “no” on the " . $ordinance . "  under consideration.</p>
<p>Thank you, " . $name . "</p>
";
break;
case 'twentyoneLetter':
$message = "
<p>Hello,</p>
<p>As a resident of " . $county . ", I’m writing to respectfully express my concern for the " . $ordinance . " under consideration.</p>
<p>This ordinance will cause more harm than good in our community in multiple ways, including:</p>
<ul>
  
  <li>Driving business to surrounding communities that are still allowed to sell tobacco products to 18 to 20-year-olds, which not only results in the ordinance having a minimal affect in 18 to 20-year-old adults, it also gives other businesses an unfair competitive advantage.</li>
  <li>Forcing police departments to regulate a new tobacco ordinance while issues with opioid abuse and homicide continue to plague our country.</li>
  <li>Opening up an opportunity for criminals to sell tobacco to 18 to 20-year-olds illegally on the black market, which can result in an increase in crime and violence, without reducing access to tobacco products.</li>
</ul>
<p>Additionally, this ordinance limits the freedoms and choices of legal adults who can get married, serve our country and vote for leaders, such as yourself. </p>
<p>While I understand the concern for the public health, please rest assured we only sell tobacco to legal adults. In fact, we go through extensive training to keep tobacco products away from underage individuals. </p>
<p>We are doing our part to keep tobacco out of the hands of our community’s youth by not selling to minors. I am in favor of any laws that will keep children from using tobacco, but I can’t support an ordinance that doesn’t support my livelihood. </p>
<p>For the sake of " . $county . " community and local businesses, please vote “no” on the " . $ordinance . " under consideration.</p>
<p>Thank you, " . $name . "</p>
";
break;
default:
# code...
break;
}
//$EmailTo = "soberdash@gmail.com";
// $Subject = "New Tobacco Ordinance";
$to = 'soberdash@gmail.com';
$subject = 'Concern Over Pending Tobacco Ordinance';
$headers = "From: " . $_POST['email'] . "\r\n";
$headers .= "Reply-To: " . $_POST['email'] . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
// send email
$success = mail($repcontact, $subject, $message, $headers);

// redirect to success page
if ($success && $errorMSG == ""){
echo "success";
}else{
if($errorMSG == ""){
echo "Something went wrong :(";
} else {
echo $errorMSG;
}
}
?>