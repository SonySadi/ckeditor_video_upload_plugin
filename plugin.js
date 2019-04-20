CKEDITOR.plugins.add("videoupload", {
  icons: "videoupload",
  init: function(editor) {
    //Plugin logic goes here.
    /* editor.addCommand("videoupload", {
      exec: function(editor) {
        editor.insertHtml("it's a image");
      }
    }); */
    CKEDITOR.dialog.add(
      "videouploadDialog",
      this.path + "dialogs/videoupload.js"
    );
    editor.addCommand(
      "videoupload",
      new CKEDITOR.dialogCommand("videouploadDialog")
    );
    editor.ui.addButton("videoupload", {
      label: "Upload Video",
      command: "videoupload",
      toolbar: "insert"
    });
  }
});
