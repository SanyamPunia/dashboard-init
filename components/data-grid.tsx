"use client";

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

export interface GridRow {
  id: number;
  timestamp: string;
  action: string;
  company: string;
  icon: string;
  [key: string]: string | number;
}

export interface Column {
  id: string;
  name: string;
  icon: string;
}

interface DataGridProps {
  rows: GridRow[];
  columns: Column[];
  onCellChange: (rowId: number, columnId: string, value: string) => void;
  onHeaderChange: (columnId: string, value: string) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  autoSave: boolean;
  onAutoSaveChange: (value: boolean) => void;
}

export default function DataGrid({
  rows,
  columns,
  onCellChange,
  onHeaderChange,
  onAddRow,
  onAddColumn,
  autoSave,
  onAutoSaveChange,
}: DataGridProps) {
  return (
    <div className={`flex flex-col min-h-screen`}>
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 h-16 fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <ArrowLeft className="h-4 w-4 text-gray-800 cursor-pointer" />
          <span className="text-sm text-gray-500">Name of the file</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={autoSave} onCheckedChange={onAutoSaveChange} />
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
          <div className="py-[26px] px-5 flex md:flex-row flex-col md:items-center gap-4 md:gap-0 justify-between border-b sticky top-0 bg-white z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-zinc-400" />
                <Input
                  placeholder="Search"
                  className="pl-8 rounded-[8px] border-gray-300 bg-gray-50 md:w-64"
                />
              </div>
              <div className="flex items-center md:gap-4 gap-2">
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
              <div className="flex items-center">
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

          <p className="text-sm text-gray-500 my-2 mx-5 p-1 bg-gray-100 w-fit border border-gray-200 rounded-md">
            Double-click on any cell to edit its content.
          </p>
          {/* Grid Header and Body */}
          <div className="overflow-x-auto">
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
                          onChange={(value) => onHeaderChange(column.id, value)}
                        />
                      </motion.th>
                    ))}
                  </AnimatePresence>
                  <th className="px-3 py-2 text-left text-sm border">
                    <Button
                      variant="link"
                      size="sm"
                      className="font-semibold text-md"
                      onClick={onAddColumn}
                    >
                      <Plus className="h-4 w-4" />
                      Add Column
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rows.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      className={`hover:bg-gray-50 ${
                        index === rows.length - 1 ? "border-b" : ""
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="border-t border-l border-r px-3 py-2 text-sm w-10">
                        <span className="text-muted-foreground text-zinc-400">
                          {row.id}
                        </span>
                      </td>
                      <td className="border-t border-l border-r px-3 py-2 text-sm w-10">
                        <PlayCircle className="h-5 w-5 text-muted-foreground text-zinc-400" />
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
                                  onCellChange(row.id, column.id, value)
                                }
                              />
                            </div>
                          ) : (
                            <EditableCell
                              value={(row[column.id] as string) || ""}
                              onChange={(value) =>
                                onCellChange(row.id, column.id, value)
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
            className="sticky bottom-0 w-full"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start py-2 rounded-none hover:bg-gray-100 border-t border-x border-gray-200"
              onClick={onAddRow}
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
