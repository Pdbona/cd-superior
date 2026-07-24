/* ============================================================
   CAMADA DE DADOS — SBS Solution / CD Superior Transportes

   Este arquivo substitui o "window.storage" que existia dentro
   do Claude. Ele expõe exatamente a mesma interface (get/set),
   então o App.jsx não precisou ser reescrito.

   A diferença essencial: aqui os dados ficam em um banco na
   nuvem (Firebase Firestore). O que o conferente lança no
   celular dele aparece na tela do gestor em segundos.
   ============================================================ */

import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc
} from "firebase/firestore";

/* ------------------------------------------------------------
   CONFIGURAÇÃO — cole aqui os dados do SEU projeto Firebase.
   O passo a passo está no arquivo INSTRUCOES.md, Etapa 2.
   Não invente valores: copie e cole exatamente o que o
   Firebase mostrar na tela.
   ------------------------------------------------------------ */
const firebaseConfig = {
  apiKey: "// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzI6oC9SyxPbm92Whfa2hALJY30b9Qav4",
  authDomain: "cd-superior.firebaseapp.com",
  projectId: "cd-superior",
  storageBucket: "cd-superior.firebasestorage.app",
  messagingSenderId: "597573865631",
  appId: "1:597573865631:web:2016fef9e66f25ebed52aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);",
  authDomain: "COLE_AQUI.firebaseapp.com",
  projectId: "COLE_AQUI_SEU_PROJECT_ID",
  storageBucket: "COLE_AQUI.firebasestorage.app",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Todos os registros da operação ficam nesta coleção.
   Um documento por chave (operações, parâmetros). */
const COLECAO = "cd_superior";

export const storage = {
  /* Lê uma chave. Devolve { value } para manter compatibilidade
     com o formato que o App.jsx já esperava. */
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

  /* Grava uma chave. O App.jsx já envia o conteúdo como texto
     JSON, então gravamos exatamente esse texto. */
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
