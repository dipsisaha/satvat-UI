export class ApplicationConstants {
    // public static ORG_BOSCH="BOSCH";
    public static ORG_USER="VAT";
    public static ROLE_ASSOCIATE="ASSOCIATE";
    public static DASHBOARD_PANEL_ID = '1';
    public static VENDOR_PANEL_ID = '2'
    public static PRODUCT_PANEL_ID = '3'
    public static PURCHASE_PANEL_ID = '4'
    public static FINISH_GOODS_PANEL_ID = '5'
    public static SETTING_PANEL_ID = '6'
    public static DATE_FORMAT = 'yyyy-MM-dd';
    public static TIME_FORMAT = 'HH:mm';
    public static TIME_ZONE = 'EST';
    
    public static LOGIN_AS_EMPLOYEE= 'Employee';

    //public static API_PREFIX_SATCOM = 'api';
    //public static API_PREFIX_BOSCH = 'boschapi';
    
    public static WAREHOUSE_TYPE_IFC = 'IFC';
    public static WAREHOUSE_TYPE_NONIFC = 'Non-IFC';

    public static API_PREFIX = 'api';
    public static UPDATE_ADMIN_DETAILS = 'updateAdminDetails';
    public static GET_ADMIN_DETAILS = 'getAdminDetails';
   
    public static ADD_PRODUCT = 'addItem';
    public static GET_PRODUCT_LIST = 'getAllItem';
    public static GET_PRODUCT_DETAILS_BY_ID = 'getItemById';
    public static DELETE_PRODUCT = 'deleteByItemId';

    public static ADD_GOODS = 'addfinishedGoodItem';
    public static GET_GOODS_LIST = 'getAllFinishedGoodItem';
    public static GET_GOODS_DETAILS_BY_ID = 'getFinishedGoodItemById';
    public static DELETE_GOODS = 'deleteByFinishedGoodItemId';
    public static GET_GOODS_BY_VENDOR= 'getFinishedGoodItemByVendorId';

    public static ADD_PURCHASE = 'addPurchaseOrder';
    public static GET_PURCHASE_LIST = 'getAllPurchaseOrder';
    public static GET_PURCHASE_DETAILS_BY_ID = 'getPurchaseOrderById';
    public static DELETE_PURCHASE = 'deleteByPurchaseOrderId';

    public static ADD_VENDOR = 'createVendor';
    public static GET_VENDOR_LIST = 'getAllVendors';
    public static GET_VENDOR_DETAILS_BY_ID = 'getVendorById';
    public static DELETE_VENDOR = 'deleteByVendorId';
    public static GET_PRODUCT_BY_VENDOR_AND_RAW= 'getItemByVendorIdAndRawmat';
    
    public static API_LOGIN = 'login';
    
    
    public static USER_IDLE_BEGIN_TIME = 600; //system will wait for specified sec before mrking user as idle (10min)
    public static USER_IDLE_WAIT_TIME = 300;//system will wait for specified sec after user is marked idle and before timeout is done (10 + 5 = 15 mins)
    
    public static TOKEN_REFERSH_TIMESPAN = 1800000; //1 hours - 3600000, 55 mins - 3300000
    
	
}