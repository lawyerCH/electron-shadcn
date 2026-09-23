import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

/*
 * You can delete this page or modify it to your needs.
 * This is just a sample page to demonstrate routing.
 */

function SecondPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      <h1 className="font-bold text-4xl">{t("titleSecondPage")}</h1>
    </div>
  );
}

export const Route = createFileRoute("/second")({
  component: SecondPage,
});
