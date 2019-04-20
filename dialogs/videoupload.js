CKEDITOR.dialog.add("videouploadDialog", function (editor) {
  return {
    title: "Video Upload",
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: "upload_video_dialog",
        label: "Upload Video",
        elements: [
          {
            type: "html",
            html: '<input type="file" id="videofileuploadinput" />'
          },
          {
            type: 'text',
            id: 'video_width',
            label: 'Width'
          },
          {
            type: 'text',
            id: 'video_height',
            label: 'Height'
          }
        ]
      }
    ],
    onOk: function () {
      let dialogbox = this;
      dialogElement = dialogbox.getElement();
      var formData = new FormData();
      formData.append("_csrf", document.getElementById("csrftocken").value);
      formData.append(
        "fileToUpload",
        dialogElement.$.getElementsByTagName("input")[0].files[0]
      );
      let width = dialogbox.getValueOf('upload_video_dialog', 'video_width');
      let height = dialogbox.getValueOf('upload_video_dialog', 'video_height');
      $.ajax({
        type: "POST",
        url: "/social-post/video_upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (r) {
          if (r.state) {
            let addattr = "";
            addattr += (width.length > 0) ? ' width="' + width + '"' : "";
            addattr += (height.length > 0) ? ' height="' + height + '"' : "";
            editor.insertHtml(
              '<video ' + addattr + ' controls><source src="' +
              r.src +
              '" type="video/mp4"> Video uploaded.</video>'
            );
          }
          else {
            console.log(r.msg);
          }

        }
      });
    }
  };
});
