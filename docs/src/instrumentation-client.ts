import posthog from "posthog-js";
import { ENV } from "varlock/env";

const posthogHost = ENV.NEXT_PUBLIC_POSTHOG_HOST;
const posthogKey = ENV.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey && posthogHost) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: "2026-05-30",
  });
}
