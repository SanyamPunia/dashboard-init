import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface EditableHeaderProps {
  initialValue: string;
  icon: string;
  onChange: (value: string) => void;
}

const EditableHeader: React.FC<EditableHeaderProps> = ({
  initialValue,
  icon,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

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
    onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onChange(value);
    }
  };

  const getIconContent = () => {
    if (icon !== "A" && icon.startsWith("/")) {
      return (
        <Image
          src={icon || "/placeholder.svg"}
          width={18}
          height={18}
          alt={value}
        />
      );
    } else {
      return (
        <div className="bg-black text-sm text-white w-5 h-5 flex items-center justify-center rounded">
          {value.charAt(0).toUpperCase()}
        </div>
      );
    }
  };

  if (isEditing) {
    return (
      <motion.input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent outline-none border-b border-blue-500 font-semibold text-sm"
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
      className="flex items-center gap-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {getIconContent()}
      <span className="font-semibold text-sm">{value}</span>
    </motion.div>
  );
};

export default EditableHeader;
