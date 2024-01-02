const superAdminApi = {
  // super-admin login api
  superadminLogin: "super-admin/login",

  //----------------------------- Header Modlue Start ----------------
  // get bell icon alert notifications
  allAlertNotifications: "super-admin/get-alert-notifications",

  // get bell icon alert notifications by reg_id
  allAlertNotificationsByRegId: "super-admin/get-alert-notifications/",

  //----------------------------- Dashboard Modlue Start ----------------
  // get registered users count
  registeredUsersCount: "super-admin/get-registered-users-count",

  //----------------------------- Quotes Modlue Start ----------------
  // get all quotes
  allQuotes: "quotes/get-all-quotes",

  // insert quote
  addQuote: "quotes/insert-quote",

  // get quote detail by id
  quoteDetail: "quotes/get-quote-detail/",

  // edit specific quote by id
  editQuote: "quotes/edit-quote/",

  // delete quote by id
  deleteQuote: "quotes/delete-quote/",

  //----------------------------- Registered Users Modlue Start ----------------
  // get all registered users
  allRegisteredUsers: "super-admin/get-all-registered-users",

  // get user detail by reg_id
  userDetail: "super-admin/get-user-detail/",

  // get all deactivated users
  allDeactivatedUsers: "super-admin/get-all-deactivated-users",

  // get refund list
  refundList: "super-admin/get-refund-list",

  // update refund status by reg_id
  updateRefundStatus: "refund/update-refund-status/",

  //----------------------------- Pricing Modlue Start ----------------
  // get pricing list
  pricingList: "pricing/get-pricing-list",

  // get package detail by pack_id
  packageDetail: "pricing/get-package-detail/",

  // update package status (active/inactive)
  updatePackageStatus: "pricing/update-package-status",

  //----------------------------- Enterprise Leads Modlue Start ----------------
  // get contacted sales list
  contactedSalesList: "super-admin/get-contacted-sales-list",

  // get contacted company and it's package detail by cid
  contactedCompanyAndItsPackageDetail:
    "enterprise-leads/get-contacted-company-and-package-detail/",

  // update status of specific contacted company (active/inactive)
  updateContactedCompanyStatus:
    "enterprise-leads/update-contacted-company-status",

  // delete contact sales request by cid
  deleteContactSalesRequest: "enterprise-leads/delete-contact-sales-request/",

  //----------------------------- Ad Setting Modlue Start ----------------
  // get ad list
  adList: "super-admin/get-ad-list",

  // insert ad
  uploadAd: "ad-setting/insert-ad",

  // update status of specific ad (active/inactive)
  updateAdStatus: "ad-setting/update-ad-status",

  // delete ad by aid
  deleteAd: "ad-setting/delete-ad/",

  //----------------------------- Coupon Setting Modlue Start ----------------
  // get coupon list
  couponList: "super-admin/get-coupon-list",

  // get coupon and package details by co_id
  couponAndPackageDetail: "coupon-setting/get-coupon-and-package-detail/",

  // update status of specific coupon (active/inactive)
  updateCouponStatus: "coupon-setting/update-coupon-status",

  //----------------------------- Community Modlue Start ----------------
  // get decision makers
  decisionMakers: "super-admin/get-decision-makers",

  // update expert status (active/inactive)
  updateExpertStatus: "community/update-expert-status",

  // get decision maker detail by reg_id
  decisionMakerDetail: "community/get-decision-maker-detail/",

  // get decision maker call rate detail
  decisionMakerCallRateDetail: "community/get-decision-maker-call-rate-detail",

  // get decision maker category
  decisionMakerCategory: "super-admin/get-decision-maker-category",

  // insert decision maker category
  addCategory: "decision-maker-category/insert-category",

  // update category status (active/inactive)
  updateCategoryStatus: "decision-maker-category/update-category-status",

  // delete decision maker category by id
  deleteCategory: "decision-maker-category/delete-category/",

  // get decision maker category detail by cat_id
  decisionMakerCategoryDetail:
    "decision-maker-category/get-decision-maker-category-detail/",

  // edit category
  editCategory: "decision-maker-category/edit-category",

  // get decision maker agreement
  decisionMakerAgreement: "super-admin/get-decision-maker-agreement",

  // insert decision maker agreement
  addAgreement: "decision-maker-agreement/insert-agreement",

  // update agreement status (1/0)
  updateAgreementStatus: "decision-maker-agreement/update-agreement-status",

  // delete decision maker agreement by id
  deleteAgreement: "decision-maker-agreement/delete-agreement/",

  // get decision maker agreement detail by agree_id
  decisionMakerAgreementDetail: "super-admin/decision-maker-agreement/",

  // edit agreement
  editAgreement: "decision-maker-agreement/edit-agreement",

  //----------------------------- Ticket Management Modlue Start ----------------
  // get all tickets
  allTickets: "super-admin/get-all-tickets",

  // get user by reg_id
  user: "super-admin/get-user/",

  // get all supporter
  allSupporter: "super-admin/get-all-supporter",

  // get ticket detail by ticket_id
  ticketDetail: "ticket-management/get-ticket-detail/",

  // assign ticket to supporter
  assignTicket: "ticket-management/assign-ticket",

  // delete ticket by id
  deleteTicket: "ticket-management/delete-ticket",

  // update ticket chat notify
  updateTicketChatNotify: "ticket-management/update-ticket-chat-notify",

  // get ticket messages by ticket_id
  ticketMessages: "ticket-management/get-ticket-messages",

  // insert ticket chat
  addTicketChat: "ticket-management/insert-ticket-chat",

  //----------------------------- Supporters Modlue Start ----------------
  // get supporters
  allSupporters: "super-admin/get-supporters",

  // add supporter
  addSupporter: "supporters/insert-supporter",

  // update supporter invitation status by status and reg_id (approve/deny)
  updateSupporterInvitationStatus: "supporter-invitation/",

  // update supporter invitation through email status by status and email_address (approve/deny)
  updateSupporterInvitationThroughEmailStatus:
    "supporter-invitation-through-email/",

  // update supporter status (active/inactive)
  updateSupporterStatus: "supporters/update-supporter-status",

  // get supporter detail by reg_id
  supporterDetail: "supporters/get-supporter-detail/",

  // get invited email addresses
  allInvitedEmailAddresses: "super-admin/get-invited-email-addresses",

  // delete invited supporter (remove button)
  deleteInvitedSupporter: "supporters/delete-invited-supporter",
};

export default superAdminApi;
