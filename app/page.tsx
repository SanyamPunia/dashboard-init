"use client";

import { useState, useCallback } from "react";
import DataGrid, { GridRow, Column } from "@/components/data-grid";

const imageArray = ["/assets/figma.png", "/assets/gpt.png", "/assets/bmw.png"];

export default function Page() {
  const [autoSave, setAutoSave] = useState(false);
  const [rows, setRows] = useState<GridRow[]>([
    {
      id: 1,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "Bitscale Evaluation - Account relevancy check.csv",
      company: "Bitscale Evaluation - Account relevancy check.csv",
      icon: "/assets/figma.png",
    },
    {
      id: 2,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "cell data size exceeds limit",
      company: "BMW Evaluation - Relevancy check.csv",
      icon: "/assets/gpt.png",
    },
    {
      id: 3,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "https://www.linkedIn.com/bitScale.ai/sample",
      company: "Google Evaluation - Lilevancy check.csv",
      icon: "/assets/figma.png",
    },
    {
      id: 4,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "Loading data, Please wait",
      company: "Apple Evaluation - Olvancy check.csv",
      icon: "/assets/bmw.png",
    },
    {
      id: 5,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "Loading data, Please wait",
      company: "Apple Evaluation - Olvancy check.csv",
      icon: "/assets/gpt.png",
    },
  ]);

  const [columns, setColumns] = useState<Column[]>([
    { id: "timestamp", name: "Input Column", icon: "A" },
    { id: "action", name: "Action column", icon: "/assets/gpt.png" },
    { id: "company", name: "Enrich Company", icon: "/assets/enrich.png" },
  ]);

  const handleCellChange = useCallback(
    (rowId: number, columnId: string, value: string) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId ? { ...row, [columnId]: value } : row
        )
      );
    },
    []
  );

  const handleHeaderChange = useCallback((columnId: string, value: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, name: value, icon: value.charAt(0).toUpperCase() }
          : column
      )
    );
  }, []);

  const addRow = useCallback(() => {
    const randomImage =
      imageArray[Math.floor(Math.random() * imageArray.length)];
    const newRow: GridRow = {
      id: rows.length + 1,
      timestamp: "",
      action: "",
      company: "",
      icon: randomImage,
    };
    columns.forEach((column) => {
      if (!["timestamp", "action", "company", "icon"].includes(column.id)) {
        newRow[column.id] = "";
      }
    });
    setRows((prevRows) => [...prevRows, newRow]);
  }, [rows, columns]);

  const addColumn = useCallback(() => {
    const newColumnId = `column${columns.length + 1}`;
    setColumns((prevColumns) => [
      ...prevColumns,
      { id: newColumnId, name: `New Column ${columns.length + 1}`, icon: "A" },
    ]);
    setRows((prevRows) =>
      prevRows.map((row) => ({ ...row, [newColumnId]: "" }))
    );
  }, [columns]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      onCellChange={handleCellChange}
      onHeaderChange={handleHeaderChange}
      onAddRow={addRow}
      onAddColumn={addColumn}
      autoSave={autoSave}
      onAutoSaveChange={setAutoSave}
    />
  );
}
