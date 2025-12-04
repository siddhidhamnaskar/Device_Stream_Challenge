export function exportToCSV(data, filename = "export.csv") {
  if (!data || data.length === 0) return;

  const header = Object.keys(data[0]).join(",");

  const rows = data.map(row =>
    Object.values(row)
      .map(v => (v === null ? "" : v))
      .join(",")
  );

  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
