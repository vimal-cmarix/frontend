import API from '../index';

class PaymentService extends API {
  constructor() {
    super('payment');
  }

  getStatus() {
    return this.get('/health');
  }

  getProducts() {
    return this.get('/products?rql=limit(20,0),sort(-createdAt)');
  }

  getPlans() {
    return this.get('/plans?rql=limit(100,0),sort(-createdAt)');
  }

  getTransactions() {
    return this.get('/transactions?rql=limit(20,0),sort(-createdAt)');
  }

  getDisputes() {
    return this.get(
      '/transactions?rql=limit(20,0),sort(-createdAt),ne(disputeStatus,null)',
    );
  }

  subscription(data) {
    return this.post('/subscriptions', data);
  }

  cancelSubscription(id) {
    return this.delete(`/subscriptions/${id}`);
  }

  createCustomer(data) {
    return this.put('/customers', data);
  }

  createPayment(customerId, data) {
    return this.post(`/customers/${customerId}/payment-methods`, data);
  }

  createTransaction(data) {
    return this.post(`/transactions`, data);
  }

  deletePaymentMethods(customerId, data) {
    return this.delete(`/customers/${customerId}/payment-methods`, { data });
  }

  getUserPlanActive() {
    return this.get(
      '/subscriptions?rql=limit(20,0),sort(-createdAt),eq(status,Active)',
    );
  }

  checkPendencie(planIdData) {
    return this.post('/pendencie', planIdData);
  }

  async subscriptionDiscount() {
    return this.put('/subscriptions/discount');
  }
}

export default new PaymentService();
