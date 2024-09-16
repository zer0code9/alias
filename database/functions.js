const { db } = require('./database');
const { doc, setDoc, updateDoc, getDoc, getDocs, deleteDoc, collection } = require('firebase/firestore');
const AliasUtils = require('../helpers/utils');

module.exports = class AliasDB {
    static database() {
        return db;
    }

    static async searchDocs(colRef, search) {
        (await getDocs(colRef)).forEach((doc) => {
            if (doc.id == search) return doc;
        })
        return false;
    }

    static async userLogin(user) {
        setDoc(doc(db, 'users', user.id), {
            idA: AliasUtils.generateId('au', user.id),
            currency: {
                ticket: 0,
                star: 0,
            },
            xp: 0,
            items: []
        })
    }

    static async guildLogin(guild) {
        setDoc(doc(db, 'guilds', guild.id), {
            idA: AliasUtils.generateId('ag', guild.id),
            currency: {
                token: 0,
                powder: 0,
            },
            xp: 0,
            tckets: [],
            shops: [],
            logs: [],
        })
    }

    static async memberLogin(member) {
        setDoc(doc(db, 'guilds', member.guild.id, 'members', member.user.id), {
            idG: AliasUtils.generateId('gm', member.guild.id),
            idA: 1,
            currency: {
                gold: 0,
                cookie: 0
            },
            xp: 0,
            warns: [],
            items: [],
        })
    }

}