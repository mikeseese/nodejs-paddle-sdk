import {
  Address,
  Adjustment,
  Business,
  Customer,
  Event,
  Price,
  Product,
  Subscription,
  Transaction
} from './objects';

export type PaddleWebhook =
  | AddressCreated
  | AddressUpdated
  | AdjustmentCreated
  | AdjustmentUpdated
  | BusinessCreated
  | BusinessUpdated
  | CustomerCreated
  | CustomerUpdated
  | PriceCreated
  | PriceUpdated
  | ProductCreated
  | ProductUpdated
  | SubscriptionActivated
  | SubscriptionCanceled
  | SubscriptionCreated
  | SubscriptionPastDue
  | SubscriptionPaused
  | SubscriptionResumed
  | SubscriptionTrialing
  | SubscriptionUpdated
  | TransactionBilled
  | TransactionCanceled
  | TransactionCompleted
  | TransactionCreated
  | TransactionPastDue
  | TransactionPaymentFailed
  | TransactionReady
  | TransactionUpdated;

export type AddressCreated = Event & {
  event_type: 'address.created';
  data: Address;
};

export type AddressUpdated = Event & {
  event_type: 'address.updated';
  data: Address;
};

export type AdjustmentCreated = Event & {
  event_type: 'adjustment.created';
  data: Adjustment;
};

export type AdjustmentUpdated = Event & {
  event_type: 'adjustment.updated';
  data: Adjustment;
};

export type BusinessCreated = Event & {
  event_type: 'business.created';
  data: Business;
};

export type BusinessUpdated = Event & {
  event_type: 'business.updated';
  data: Business;
};

export type CustomerCreated = Event & {
  event_type: 'customer.created';
  data: Customer;
};

export type CustomerUpdated = Event & {
  event_type: 'customer.updated';
  data: Customer;
};

export type PriceCreated = Event & {
  event_type: 'price.created';
  data: Price;
};

export type PriceUpdated = Event & {
  event_type: 'price.updated';
  data: Price;
};

export type ProductCreated = Event & {
  event_type: 'product.created';
  data: Product;
};

export type ProductUpdated = Event & {
  event_type: 'product.updated';
  data: Product;
};

export type SubscriptionActivated = Event & {
  event_type: 'subscription.activated';
  data: Subscription;
};

export type SubscriptionCanceled = Event & {
  event_type: 'subscription.canceled';
  data: Subscription;
};

export type SubscriptionCreated = Event & {
  event_type: 'subscription.created';
  data: Subscription;
};

export type SubscriptionPastDue = Event & {
  event_type: 'subscription.past_due';
  data: Subscription;
};

export type SubscriptionPaused = Event & {
  event_type: 'subscription.paused';
  data: Subscription;
};

export type SubscriptionResumed = Event & {
  event_type: 'subscription.resumed';
  data: Subscription;
};

export type SubscriptionTrialing = Event & {
  event_type: 'subscription.trialing';
  data: Subscription;
};

export type SubscriptionUpdated = Event & {
  event_type: 'subscription.updated';
  data: Subscription;
};

export type TransactionBilled = Event & {
  event_type: 'transaction.billed';
  data: Transaction;
};

export type TransactionCanceled = Event & {
  event_type: 'transaction.canceled';
  data: Transaction;
};

export type TransactionCompleted = Event & {
  event_type: 'transaction.completed';
  data: Transaction;
};

export type TransactionCreated = Event & {
  event_type: 'transaction.created';
  data: Transaction;
};

export type TransactionPastDue = Event & {
  event_type: 'transaction.past_due';
  data: Transaction;
};

export type TransactionPaymentFailed = Event & {
  event_type: 'transaction.payment_failed';
  data: Transaction;
};

export type TransactionReady = Event & {
  event_type: 'transaction.ready';
  data: Transaction;
};

export type TransactionUpdated = Event & {
  event_type: 'transaction.updated';
  data: Transaction;
};
