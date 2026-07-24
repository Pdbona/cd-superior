/* ============================================================
   CAMADA DE DADOS — SBS Solution / CD Superior Transportes
   ...
   ============================================================ */
import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzI6oC9SyxPbm92Whfa2hALJY30b9Qav4",
  authDomain: "cd-superior.firebaseapp.com",
  projectId: "cd-superior",
  storageBucket: "cd-superior.firebasestorage.app",
  messagingSenderId: "597573865631",
  appId: "1:597573865631:web:2016fef9e66f25ebed52aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLECAO = "cd_superior";

export const storage = {
  async get(chave) {
    try {
      const snap = await getDoc(doc(db, COLECAO, chave));
      if (!snap.exists()) return null;
      const dados = snap.data();
      return { key: chave, value: dados.value };
    } catch (e) {
      console.error("Falha ao ler do banco:", e);
      throw e;
    }
  },

  async set(chave, valor) {
    try {
      await setDoc(doc(db, COLECAO, chave), {
        value: valor,
        atualizadoEm: Date.now()
      });
      return { key: chave, value: valor };
    } catch (e) {
      console.error("Falha ao gravar no banco:", e);
      throw e;
    }
  }
};
