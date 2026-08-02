/* ============================================================
   CAMADA DE DADOS — SBS Solution / CD Superior Transportes
   v2 — acrescenta del() para a limpeza automática das fotos.
   Nada mais mudou: credenciais e get/set continuam idênticos.
   ============================================================ */
import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc, deleteDoc
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
  },

  /* Remove um documento inteiro. Usado só pela limpeza automática das
     fotos (retenção de 5 dias). Sem isso, as fotos vencidas continuariam
     ocupando espaço no Firestore indefinidamente. */
  async del(chave) {
    try {
      await deleteDoc(doc(db, COLECAO, chave));
      return { key: chave, deleted: true };
    } catch (e) {
      console.error("Falha ao excluir do banco:", e);
      throw e;
    }
  }
};
