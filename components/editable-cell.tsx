import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface EditableCellProps {
  value: string;
  onChange: (value: string) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onChange(editedValue);
    }
  };

  if (isEditing) {
    return (
      <motion.input
        ref={inputRef}
        type="text"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent outline-none border-b border-blue-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      />
    );
  }

  return (
    <motion.div
      onDoubleClick={handleDoubleClick}
      className="min-w-[50px] max-w-[264px] w-auto overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {editedValue || "Double-click to edit"}
    </motion.div>
  );
};

export default EditableCell;
