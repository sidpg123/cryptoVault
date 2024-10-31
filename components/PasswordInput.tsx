import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  field: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    name: string;
  };
  placeholder?: string;
}

export function PasswordInput({ field, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        type={showPassword ? "text" : "password"}
        {...field}
        placeholder={placeholder || "Password"}
        style={{ paddingRight: "40px" }}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
}
