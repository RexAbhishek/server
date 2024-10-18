export const sendMail = async (receiverMail) => {
const auth = nodemailer.createTransport({
    service: "gmail",
    secure : true,
    port : 465,
    auth: {
        user: "youremail@gmail.com",
        pass: "your_password"

    }
});

const receiver = {
    from : "youremail@gmail.com",
    to : receiverMail,
    subject : "Node Js Mail Testing!",
    text : "Hello this is a text mail!"
};

auth.sendMail(receiver, (error, response) => {
    if(error)
    throw error;
    console.log("success!");
    response.end();
});

}


