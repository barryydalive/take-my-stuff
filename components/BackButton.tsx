import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

interface BackButtonProps {
  label?: string;
}

const BackButton = ({ label = "Back" }: BackButtonProps) => {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <Button startIcon={<ArrowBack />} onClick={handleClick}>
      {label}
    </Button>
  );
};

export default BackButton;
