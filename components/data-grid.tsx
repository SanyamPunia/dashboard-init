"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  PlayCircle,
  ArrowLeft,
  Search,
  Share2,
  Download,
  Trash2,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Sidebar from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";
import EditableCell from "./editable-cell";
import EditableHeader from "./editable-header";

const imageArray = ["/assets/figma.png", "/assets/gpt.png", "/assets/bmw.png"];

interface GridRow {
  id: number;
  timestamp: string;
  action: string;
  company: string;
  icon: string;
  [key: string]: string | number;
}

interface Column {
  id: string;
  name: string;
  icon: string;
}

export default function DataGrid() {
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

  const handleCellChange = (rowId: number, columnId: string, value: string) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, [columnId]: value } : row
      )
    );
  };

  const handleHeaderChange = (columnId: string, value: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, name: value, icon: value.charAt(0).toUpperCase() }
          : column
      )
    );
  };

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
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-[#E5E5E5] h-16 fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <ArrowLeft className="h-4 w-4 text-gray-800 cursor-pointer" />
          <span className="text-sm text-gray-500">Name of the file</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            <span className="text-sm text-green-600">Auto Save</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image
              src="/assets/user.svg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 pt-16">
        <Sidebar />
        <motion.div
          className="flex-1 overflow-y-auto"
          initial={{ marginLeft: "62px" }}
          animate={{ marginLeft: "62px" }}
          transition={{ duration: 0.3 }}
        >
          {/* Toolbar */}
          <div className="py-[26px] px-5 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between border-b sticky top-0 bg-white z-10">
            <div className="w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8 rounded-[8px] border-gray-300 bg-gray-50 w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-between w-full sm:w-auto">
              <div className="flex items-center gap-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-[6px] text-gray-800 font-semibold"
                >
                  <Image
                    src="/assets/toolbar-1.svg"
                    width={12}
                    height={12}
                    alt="toolbar"
                  />
                  {rows.length}/{rows.length} Row
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-[6px] text-gray-800 font-semibold"
                >
                  <Image
                    src="/assets/toolbar-2.svg"
                    width={12}
                    height={12}
                    alt="toolbar"
                  />
                  {columns.length}/{columns.length} Column
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-[6px] text-gray-800 font-semibold"
                >
                  <Image
                    src="/assets/toolbar-3.svg"
                    width={12}
                    height={12}
                    alt="toolbar"
                  />
                  0 Filter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-[6px] text-gray-800 font-semibold"
                >
                  <Image
                    src="/assets/toolbar-4.svg"
                    width={12}
                    height={12}
                    alt="toolbar"
                  />
                  Sort
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="default"
                  size="sm"
                  className="font-semibold gap-[6px]"
                >
                  <Image
                    src="/assets/toolbar-5.svg"
                    width={12}
                    height={12}
                    alt="toolbar"
                  />
                  Enrich
                </Button>
                <div className="flex items-center ">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Header and Body */}
          <div className="overflow-auto table-container">
            <table className="w-auto border-collapse table-auto">
              <thead>
                <tr className="bg-[#F6F6F6]">
                  <th className="px-3 py-2 text-left text-sm w-10 border font-medium">
                    {" "}
                  </th>
                  <th className="px-3 py-2 text-left text-sm w-10 border font-medium">
                    {" "}
                  </th>
                  <AnimatePresence>
                    {columns.map((column, index) => (
                      <motion.th
                        key={column.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`px-3 py-2 text-left text-sm border font-medium ${
                          index === 0 ? "bg-[#FEF2C7]" : ""
                        }`}
                      >
                        <EditableHeader
                          initialValue={column.name}
                          icon={column.icon}
                          onChange={(value) =>
                            handleHeaderChange(column.id, value)
                          }
                        />
                      </motion.th>
                    ))}
                  </AnimatePresence>
                  <th className="px-3 py-2 text-left text-sm border">
                    <Button
                      variant="link"
                      size="sm"
                      className="font-semibold text-md"
                      onClick={addColumn}
                    >
                      <Plus className="h-4 w-4" />
                      Add Column
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rows.map((row) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="border-t border-l border-r px-3 py-2 text-sm w-10">
                        <span className="text-muted-foreground">{row.id}</span>
                      </td>
                      <td className="border-t border-l border-r px-3 py-2 text-sm w-10">
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      </td>
                      {columns.map((column) => (
                        <td
                          key={`${row.id}-${column.id}`}
                          className="border-t border-l border-r px-3 py-2 text-sm"
                        >
                          {column.id === "company" ? (
                            <div className="flex items-center gap-2">
                              <Image
                                src={row.icon || "/placeholder.svg"}
                                alt={row[column.id] as string}
                                width={18}
                                height={18}
                                className="rounded"
                              />
                              <EditableCell
                                value={(row[column.id] as string) || ""}
                                onChange={(value) =>
                                  handleCellChange(row.id, column.id, value)
                                }
                              />
                            </div>
                          ) : (
                            <EditableCell
                              value={(row[column.id] as string) || ""}
                              onChange={(value) =>
                                handleCellChange(row.id, column.id, value)
                              }
                            />
                          )}
                        </td>
                      ))}
                      <td className="border-t border-l border-r px-3 py-2 text-sm w-full"></td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <motion.div
            className="add-row-btn"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start py-2 rounded-none hover:bg-gray-100 border-t border-x border-gray-200 "
              onClick={addRow}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Row
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
