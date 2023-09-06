import { PaddleWebhook } from './webhook';
import { CountryCode, CurrencyCode, Period, UnitPrice } from './common';

export type Product = {
  id: number;
  name: string;
  description: string | null;
  tax_category:
    | 'digital-goods'
    | 'ebooks'
    | 'implementation-services'
    | 'professional-services'
    | 'saas'
    | 'software-programming-services'
    | 'standard'
    | 'training-services'
    | 'website-hosting';
  image_url: string | null;
  custom_data: any | null;
  status: 'active' | 'archived';
  created_at: string;
};

export type Price = {
  id: string;
  product_id: string;
  description: string;
  billing_cycle: null | Period;
  trial_period: null | Period;
  tax_mode: 'account_setting' | 'external' | 'internal';
  unit_price: UnitPrice;
  unit_price_overrides: {
    country_codes: CountryCode[];
    unit_price: UnitPrice;
  }[];
  quantity: {
    minimum: number;
    maximum: number;
  };
  status: 'active' | 'archived';
  custom_data: any | null;
};

export type Discount = {
  id: string;
  status: 'active' | 'archived' | 'expired' | 'used';
  description: string;
  enabled_for_checkout: boolean;
  code: string | null;
  type: 'flat' | 'flat_per_seat' | 'percentage';
  amount: string;
  currency_code: CurrencyCode | null;
  recur: boolean;
  maximum_recurring_intervals: number | null;
  usage_limit: number | null;
  restrict_to: string[] | null;
  expires_at: string | null;
  times_used: number;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  name: string | null;
  email: string;
  marketing_consent: boolean;
  status: 'active' | 'archived';
  locale: string;
  created_at: string;
  updated_at: string;
};

export type Address = {
  id: string;
  description: string;
  first_line: string | null;
  second_line: string | null;
  city: string | null;
  postal_code: string | null;
  region: string | null;
  country: CountryCode;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
};

export type Business = {
  id: string;
  name: string;
  company_number: string | null;
  tax_identifier: string | null;
  status: 'active' | 'archived';
  contacts: {
    name: string;
    email: string;
  }[];
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  status: 'draft' | 'ready' | 'billed' | 'completed' | 'canceled' | 'past_due';
  customer_id: string | null;
  address_id: string | null;
  business_id: string | null;
  custom_data: any | null;
  currency_code: CurrencyCode;
  origin: 'api' | 'subscription_charge' | 'subscription_payment_method_change' | 'subscription_recurring' | 'subscription_update' | 'web';
  subscription_id: string | null;
  invoice_id: string | null;
  invoice_number: string | null;
  collection_mode: 'automatic' | 'manual';
  discount_id: string | null;
  billing_details: null | {
    enable_checkout: boolean;
    purchase_order_number: string;
    additional_information: string;
    payment_terms: Period;
  };
  billing_period: null | {
    starts_at: string;
    ends_at: string;
  };
  items: {
    price_id: string;
    price: Price;
    quantity: number;
    proration: null | {
      rate: string;
      billing_period: {
        starts_at: string;
        ends_at: string;
      };
    }
  }[];
  details: {
    tax_rates_used: {
      tax_rate: string;
      totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
    }[];
    totals: {
      subtotal: string;
      discount: string;
      tax: string;
      total: string;
      credit: string;
      balance: string;
      grand_total: string;
      fee: string | null;
      earnings: string | null;
      currency_code: CurrencyCode;
    };
    adjusted_totals: {
      subtotal: string;
      tax: string;
      total: string;
      grand_total: string;
      fee: string | null;
      earnings: string | null;
      currency_code: CurrencyCode;
    };
    payout_totals: null | {
      subtotal: string;
      discount: string;
      tax: string;
      total: string;
      credit: string;
      balance: string;
      grand_total: string;
      fee: string;
      earnings: string;
      currency_code: CurrencyCode;
    };
    adjusted_payout_totals: null | {
      subtotal: string;
      tax: string;
      total: string;
      fee: string;
      chargeback_fee: {
        amount: string;
        original: null | {
          amount: string;
          currency_code: CurrencyCode;
        };
      };
      earnings: string;
      currency_code: CurrencyCode;
    };
    line_items: {
      id: string;
      price_id: string;
      quantity: number;
      proration: null | {
        rate: string;
        billing_period: {
          starts_at: string;
          ends_at: string;
        };
      };
      tax_rate: string;
      unit_totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
      totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
      product: Product;
    }[];
  };
  payments: {
    payment_attempt_id: string;
    stored_payment_method_id: string;
    amount: string;
    status:
      | 'authorized'
      | 'authorized_flagged'
      | 'canceled'
      | 'captured'
      | 'error'
      | 'action_required'
      | 'pending_no_action_required'
      | 'created'
      | 'unknown'
      | 'dropped';
    error_code: null
      | 'already_canceled'
      | 'already_refunded'
      | 'authentication_failed'
      | 'blocked_card'
      | 'canceled'
      | 'declined'
      | 'expired_card'
      | 'fraud'
      | 'invalid_amount'
      | 'invalid_payment_details'
      | 'issuer_unavailable'
      | 'not_enough_balance'
      | 'psp_error'
      | 'redacted_payment_method'
      | 'system_error'
      | 'transaction_not_permitted'
      | 'unknown';
    method_details: {
      type:
        | 'alipay'
        | 'apple_pay'
        | 'card'
        | 'google_pay'
        | 'ideal'
        | 'offline'
        | 'paypal'
        | 'unknown'
        | 'wire_transfer';
      card: null | {
        type:
          | 'american_express'
          | 'diners_club'
          | 'discover'
          | 'jcb'
          | 'mada'
          | 'maestro'
          | 'mastercard'
          | 'union_pay'
          | 'unknown'
          | 'visa';
        last4: string;
        expiry_month: number;
        expiry_year: number;
      };
    };
    created_at: string;
    captured_at: string | null;
  }[];
  checkout: null | {
    url: string | null;
  };
  created_at: string;
  updated_at: string;
  billed_at: string | null;
};

export type Subscription = {
  id: string;
  status:
    | 'active'
    | 'canceled'
    | 'past_due'
    | 'paused'
    | 'trialing';
  customer_id: string;
  address_id: string;
  business_id: string | null;
  currency_code: CurrencyCode;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  first_billed_at: string | null;
  next_billed_at: string | null;
  paused_at: string | null;
  canceled_at: string | null;
  discount: null | {
    id: string;
    starts_at: string;
    ends_at: null | string; // MIKE HERE: should be or null on site
  };
  collection_mode: 'automatic' | 'manual';
  billing_details: null | {
    enable_checkout: boolean;
    purchase_order_number: string;
    additional_information: string;
    payment_terms: Period;
  };
  current_billing_period: null | {
    starts_at: string;
    ends_at: string;
  };
  billing_cycle: Period;
  scheduled_change: null | {
    action: 'cancel' | 'pause' | 'resume';
    effective_at: string;
    resume_at: string | null;
  };
  management_urls: {
    update_payment_method: string | null;
    cancel: string;
  };
  items: {
    status: 'active' | 'inactive' | 'trialing';
    quantity: number;
    recurring: boolean;
    created_at: string;
    updated_at: string;
    previously_billed_at: string | null;
    next_billed_at: string | null;
    trial_dates: null | {
      starts_at: string;
      ends_at: string;
    };
    price: Price;
  }[];
  custom_data: any | null;
};

export type Adjustment = {
  id: string;
  action: 'credit' | 'refund' | 'chargeback' | 'chargeback_warning';
  transaction_id: string;
  subscription_id: string | null;
  customer_id: string;
  reason: string;
  credit_applied_to_balance: boolean;
  currency_code: CurrencyCode;
  status: 'pending_approval' | 'approved' | 'rejected';
  items: {
    id: string;
    item_id: string;
    type: 'full' | 'partial' | 'tax' | 'proration';
    amount: string;
    proration: null | {
      rate: string;
      billing_period: {
        starts_at: string;
        ends_at: string;
      };
    };
    totals: {
      subtotal: string;
      tax: string;
      total: string;
    };
  }[];
  totals: {
    subtotal: string;
    tax: string;
    total: string;
    fee: string;
    earnings: string;
    currency_code: CurrencyCode;
  };
  payout_totals: null | {
    subtotal: string;
    tax: string;
    total: string;
    fee: string;
    chargeback_fee: {
      amount: string;
      original: null | {
        amount: string;
        currency_code: CurrencyCode;
      };
    };
    earnings: string;
    currency_code: CurrencyCode;
  };
  created_at: string;
  updated_at: string;
};

export type PricingPreview = {
  customer_id: string | null;
  address_id: string | null;
  business_id: string | null;
  currency_code: CurrencyCode;
  discount_id: string | null;
  address: null | {
    postal_code: string | null;
    country: CountryCode;
  };
  customer_ip_address: string | null;
  items: {
    price_id: string
    quantity: number;
  }[];
  details: {
    line_items: {
      price: Price;
      quantity: number;
      tax_rate: string;
      unit_totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
      formatted_unit_totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
      totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
      formatted_totals: {
        subtotal: string;
        discount: string;
        tax: string;
        total: string;
      };
      product: Product;
      discounts: {
        discount: Discount;
        total: string;
        formatted_total: string;
      }[]; // MIKE HERE: should be array on site
    }[];
  };
};

export type EventType = {
  name: string;
  description: string;
  group: string;
  available_versions: number[];
};

export type Event = {
  event_id: string;
  event_type: string;
  occurred_at: string;
  notification_id: string;
};

export type NotificationSettings = {
  id: string;
  description: string;
  type: 'email' | 'url';
  destination: string;
  active: boolean;
  api_version: number;
  include_sensitive_fields: boolean;
  subscribed_events: EventType[]; // MIKE HERE not typed properly on site
  endpoint_secret_key: string;
};

export type Notification = {
  id: string;
  type: string;
  status: 'not_attempted' | 'needs_retry' | 'delivered' | 'failed';
  payload: Event;
  occurred_at: string;
  delivered_at: string | null;
  replayed_at: string | null;
  origin: 'event' | 'replay';
  last_attempt_at: string | null;
  retry_at: string | null;
  times_attempted: number;
  notification_setting_id: string;
};

export type NotificationLog = {
  id: string;
  response_code: number;
  response_content_type: string | null;
  response_body: string;
  attempted_at: string;
};
