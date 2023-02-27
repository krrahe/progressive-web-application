import { getDb, putDb } from "./myDatabase";
import { header } from "./myHeader";

export default class Editor {
  constructor() {
    const localData = localStorage.getItem("content");

    if (!CodeMirror) throw new Error("CodeMirror is not loaded");

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => this.editor.setValue(data || localData || header));
    this.editor.on("change", () =>
      localStorage.setItem("content", this.editor.getValue())
    );
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}
