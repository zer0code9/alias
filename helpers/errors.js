const { colorEmbed, emoji } = require('../config.js');
const { embedError } = require('./embeds');

function Error(msg, n1, v1, n2, v2, e) {
    const Error = embedError(colorEmbed.error, "CANCELED", `${e}`, [
        { name: `${n1}`, value: `${v1}` },
        { name: `${n2}`, value: `${v2}` }
    ])
    msg.channel.send({ embeds: [Error] });
    msg.delete();
    return;
}

function Unabled(msg, name, value) {
    return Error(msg, `${name}`, `${value}`, `Command Canceled`, `Unabled To Do cancelation`, `warning`);
}

function Invalid(msg, name, value, use) {
    return Error(msg, `${name}`, `${value}`, `Command`, `\`${use}\``, `warning`);
}

function Perm(msg, name, value) {
    return Error(msg, `${name}`, `${value}`, `Command Canceled`, `Missing Permission cancelation`, `warning`);
}

function Cancel(msg) {
    const Error = embedError(colorEmbed.error, "CANCELED", `stop_sign`, [
        { name: "Command Canceled", value: `Ordered cancelation` }
    ])
    msg.channel.send({ embeds: [Error] });
    msg.delete();
    return;
}


function Error1(type, i, n1, v1, e) {
    const Error = embedError(colorEmbed.error, "CANCELED", e, [
        { name: `${n1}`, value: `${v1}` }
    ])
    switch (i) {
        case `m`:
            type.channel.send({ embeds: [Error] });
            type.delete();
            break;
        case `i`:
            type.reply({ embeds: [Edit], ephemeral: true });
            break;
    }
    return;
}

function Error2(msg, n1, v1, n2, v2, e) {
    const Error = embedError(colorEmbed.error, "CANCELED", e, [
        { name: `${n1}`, value: `${v1}` },
        { name: `${n2}`, value: `${v2}` }
    ])
    return Error;
}

function Invalid(msg, name, value, use) { return Error2(msg, name, value, `Command`, `\`${use}\``, emoji.warning); }

function Unabled(msg, name, value) { return Error2(msg, name, value, `Command Canceled`, `Unabled To Do cancelation`, emoji.warning); }

function Perm(msg, name, value) { return Error2(msg, name, value, `Command Canceled`, `Missing Permission cancelation`, emoji.warning); }

function Cancel(msg) { return Error1(msg, `Command Canceled`, `Ordered cancelation`, emoji.stop); }

function Timeout(msg) { return Error1(msg, `Command Canceled`, `Timeout cancelation`, emoji.error); }



function Wronganswer(msg, name, value) { return Unabled(msg, `${name}`, `${value}`); }
function Unknown(msg, error) {
    return Error(msg, `Something went wrong`, `\`\`\`${error}\`\`\``, `Command Canceled`, `Unknown Error cancelation`, `question`);
}


module.exports = { Timeout, Wronganswer, Unabled, Perm, Cancel, Invalid, Unknown }