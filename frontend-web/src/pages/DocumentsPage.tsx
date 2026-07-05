import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

type DocumentItem = {
  id: string;
  filename: string;
  isSigned: boolean;
  createdAt: string;
};

export function DocumentsPage() {

  const [documents,setDocuments] =
    useState<DocumentItem[]>([]);

  const [employeeId,setEmployeeId] =
    useState("");

  const [file,setFile] =
    useState<File | null>(null);

  async function loadDocuments() {

    const docs =
      await apiRequest<DocumentItem[]>(
        "/v1/documents/my-docs"
      );

    setDocuments(docs);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function upload() {

    if (!file || !employeeId) {
      return;
    }

    const formData = new FormData();

    formData.append("employeeId", employeeId);
    formData.append("file", file);

    const token =
      localStorage.getItem("rh_access_token");

    await fetch(
      "/v1/documents/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    alert("Documento enviado");

    await loadDocuments();
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Documentos
      </h1>

      <div className="rounded-lg border border-white/10 p-6 space-y-3">

        <input
          value={employeeId}
          onChange={(e)=>
            setEmployeeId(e.target.value)
          }
          placeholder="Employee ID"
          className="w-full rounded border p-2"
        />

        <input
          type="file"
          onChange={(e)=>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

        <button
          onClick={upload}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Upload
        </button>

      </div>

      <table className="w-full">

        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Assinado</th>
            <th>Criado em</th>
          </tr>
        </thead>

        <tbody>

          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.filename}</td>
              <td>
                {doc.isSigned
                  ? "Sim"
                  : "Não"}
              </td>
              <td>{doc.createdAt}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
