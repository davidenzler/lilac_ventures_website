const nodemailer = require("nodemailer");

const contactMe = async (req, res) => {
    const urlRegEx = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/
    const { message, phone, email, lastName, firstName, interests } = req.body;
    if(urlRegEx.test(message) || urlRegEx.test(phone) || urlRegEx.test(lastName) || urlRegEx.test(firstName)) return res.sendStatus(200);
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_SECRET
        },
        tls: {
            ciphers: 'SSLv3'
        },
    });
    const formattedText = format(message, phone, email, lastName, firstName, interests)
    const info = await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: `${process.env.EMAIL_RECIPIENT}`,
        subject: "Lilac Financial Inquiry",
        text: formattedText,
    });
    return res.sendStatus(200);
}

const greetingEmail = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_SECRET
        },
        tls: {
            ciphers: 'SSLv3'
        },
    });
    const htmlMessage = generateHtmlGreeting(email, password, firstName, lastName);
    const info = await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: `${email}`,
        subject: "Lilac Financial Inquiry",
        html: htmlMessage
    });
    return res.sendStatus(200);
}

const generateHtmlGreeting = (email, password, firstName, lastName) => {
    const greeting = `<h1>Thank you for choosing Lilac Financial</h1><p>You are registered with Lilac Financial. You can access the portal by clicking the link below and signing in with the username and temporary password provided.</p><h3>Username: ${email}</h3><h3>Password: ${password}</h3><a href='https://www.lilacfinancials.com'>Launch Site</a>`

    return greeting;
}

const format = (message, phone, email, lastName, firstName, interests) => {
    var formattedString = '';
    formattedString += firstName + " " + lastName + "\n";
    formattedString += phone + '\n';
    formattedString += email + '\n\n';
    formattedString += "Expressed interest in: \n";
    for(var i=0; i<interests.length; i++) {
        formattedString += '\t' + `${i+1}. ` + interests[i] + '\n';
    }
    formattedString += '\n\n';
    formattedString += message;

    return formattedString;
}
module.exports = { contactMe, greetingEmail }