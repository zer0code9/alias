import { collection, doc, setDoc, deleteDoc, updateDoc, getDoc, addDoc, getDocs } from "firebase/firestore";
const { db } = require('./database');
const AliasUtils = require('../helpers/utils');

module.exports = class AliasDB {
    static getDocumentRef(colRef, place) {
        return doc(colRef, place);
    }

    static getCollectionRef(colRef, place) {
        return collection(colRef, place);
    }

    static async setDocument(colRef, place, docs) {
        try {
            await setDoc(doc(colRef, place), docs);
        } catch (e) {
            console.error("Error", e);
            return false;
        }
        return true;
    }

    static async deleteDocument(colRef, place) {
        try {
            await deleteDoc(doc(colRef, place));
        } catch (e) {
            console.error("Error", e);
            return false;
        }
        return true;
    }

    static async updateDocument(colRef, place, docs) {
        try {
            await updateDoc(doc(colRef, place), docs);
        } catch (e) {
            console.error("Error", e);
            return false;
        }
        return true;
    }

    static async getDocument(docRef) {
        return await getDoc(docRef);
    }

    static async setCollection(colRef, place, docs) {
        try {
            await addDoc(collection(colRef, place), docs);
        } catch (e) {
            console.error("Error", e);
            return false;
        }
        return true;
    }

    static async getCollection(colRef, place) {
        return await getDocs(collection(colRef, place));
    }

    static async userLogin(user) {
        let exist = false;
        (await this.getCollection(db, 'users')).forEach((data) => {
            if (data.id == user.user.id) exist = true;
        })
        if (!exist) 
            this.setCollection(db, `users`, {
                id: user.user.id,
                idA: 'au' + AliasUtils.generateId('u', user.id)
            })
    }
}