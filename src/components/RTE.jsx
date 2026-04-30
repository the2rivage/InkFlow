import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import conf from "../conf/conf";
export default function RTE({ name, control, label, defaultValue = "" }) {
  const theme = useSelector((state) => state.theme.themeMode);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            key={theme}
            apiKey={conf.rteApiKey}
            initialValue={defaultValue}
            init={{
              promotion: false,

              skin: theme === "dark" ? "oxide-dark" : "oxide",
              content_css: theme === "dark" ? "dark" : "default",
              branding: false,
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
