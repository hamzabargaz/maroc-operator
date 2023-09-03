export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

export const pageview = (url: string): void => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (params: {
  action: string;
  category: string;
  label: string;
  value: number;
}): void => {
  (window as any).gtag("event", params.action, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
  });
};
