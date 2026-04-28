"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'keyper/v2 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Retrieves the access time details for a specific ID.
     *
     * @throws FetchError<400, types.GetApiV2AccesstimeIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AccesstimeIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AccesstimeIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AccesstimeIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AccesstimeId = function (metadata) {
        return this.core.fetch('/api/v2/AccessTime/{id}', 'get', metadata);
    };
    SDK.prototype.putApiV2AccesstimeId = function (body, metadata) {
        return this.core.fetch('/api/v2/AccessTime/{id}', 'put', body, metadata);
    };
    /**
     * Creates a new access time entry.
     *
     * @throws FetchError<400, types.PostApiV2AccesstimeResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AccesstimeResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AccesstimeResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AccesstimeResponse500> Server Error
     */
    SDK.prototype.postApiV2Accesstime = function (body) {
        return this.core.fetch('/api/v2/AccessTime', 'post', body);
    };
    /**
     * Deletes multiple access time entries by their IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2AccesstimeDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2AccesstimeDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2AccesstimeDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2AccesstimeDeletebylistResponse500> Server Error
     */
    SDK.prototype.deleteApiV2AccesstimeDeletebylist = function (metadata) {
        return this.core.fetch('/api/v2/AccessTime/DeleteByList', 'delete', metadata);
    };
    /**
     * Retrieves an asset by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetId = function (metadata) {
        return this.core.fetch('/api/v2/Asset/{id}', 'get', metadata);
    };
    /**
     * Deletes an asset by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2AssetIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2AssetIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2AssetIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2AssetIdResponse500> Server Error
     */
    SDK.prototype.deleteApiV2AssetId = function (metadata) {
        return this.core.fetch('/api/v2/Asset/{id}', 'delete', metadata);
    };
    SDK.prototype.putApiV2AssetId = function (body, metadata) {
        return this.core.fetch('/api/v2/Asset/{id}', 'put', body, metadata);
    };
    /**
     * Retrieves assets by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/Asset/GetByList', 'get', metadata);
    };
    /**
     * Retrieves assets by user ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyuseridIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetGetbyuseridId = function (metadata) {
        return this.core.fetch('/api/v2/Asset/GetByUserId/{id}', 'get', metadata);
    };
    /**
     * Retrieves an asset by its FOB tag.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyfobtagTagResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyfobtagTagResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyfobtagTagResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyfobtagTagResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetGetbyfobtagTag = function (metadata) {
        return this.core.fetch('/api/v2/Asset/GetByFobTag/{tag}', 'get', metadata);
    };
    /**
     * Retrieves an asset by its FOB serial number.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetGetbyfobserialnumberSerialnumber = function (metadata) {
        return this.core.fetch('/api/v2/Asset/GetByFobSerialNumber/{serialNumber}', 'get', metadata);
    };
    /**
     * Retrieves assets by user access group ID with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetGetbyuseraccessgroupidId = function (metadata) {
        return this.core.fetch('/api/v2/Asset/GetByUserAccessGroupId/{id}', 'get', metadata);
    };
    /**
     * Retrieves a spare key asset by parent asset ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyparentassetidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyparentassetidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyparentassetidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyparentassetidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetGetbyparentassetidId = function (metadata) {
        return this.core.fetch('/api/v2/Asset/GetByParentAssetId/{id}', 'get', metadata);
    };
    /**
     * Retrieves all assets with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssetResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetResponse500> Server Error
     */
    SDK.prototype.getApiV2Asset = function (metadata) {
        return this.core.fetch('/api/v2/Asset', 'get', metadata);
    };
    /**
     * Creates a new asset.
     *
     * @throws FetchError<400, types.PostApiV2AssetResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AssetResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AssetResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AssetResponse500> Server Error
     */
    SDK.prototype.postApiV2Asset = function (body) {
        return this.core.fetch('/api/v2/Asset', 'post', body);
    };
    /**
     * Deletes assets by a list of IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2AssetDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2AssetDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2AssetDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2AssetDeletebylistResponse500> Server Error
     */
    SDK.prototype.deleteApiV2AssetDeletebylist = function (metadata) {
        return this.core.fetch('/api/v2/Asset/DeleteByList', 'delete', metadata);
    };
    /**
     * Attaches a FOB to an asset.
     *
     * @throws FetchError<400, types.PostApiV2AssetIdAttachfobNumberResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AssetIdAttachfobNumberResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AssetIdAttachfobNumberResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AssetIdAttachfobNumberResponse500> Server Error
     */
    SDK.prototype.postApiV2AssetIdAttachfobNumber = function (metadata) {
        return this.core.fetch('/api/v2/Asset/{id}/AttachFob/{number}', 'post', metadata);
    };
    /**
     * Detaches a FOB from an asset.
     *
     * @throws FetchError<400, types.PostApiV2AssetIdDetachfobResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AssetIdDetachfobResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AssetIdDetachfobResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AssetIdDetachfobResponse500> Server Error
     */
    SDK.prototype.postApiV2AssetIdDetachfob = function (metadata) {
        return this.core.fetch('/api/v2/Asset/{id}/DetachFob', 'post', metadata);
    };
    /**
     * Retrieves an asset log entry by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetlogIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetlogIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetlogIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetlogIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AssetlogId = function (metadata) {
        return this.core.fetch('/api/v2/AssetLog/{id}', 'get', metadata);
    };
    /**
     * Retrieves all asset log entries with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssetlogResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetlogResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetlogResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetlogResponse500> Server Error
     */
    SDK.prototype.getApiV2Assetlog = function (metadata) {
        return this.core.fetch('/api/v2/AssetLog', 'get', metadata);
    };
    /**
     * Retrieves an asset transaction by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AssettransactionIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssettransactionIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssettransactionIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssettransactionIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AssettransactionId = function (metadata) {
        return this.core.fetch('/api/v2/AssetTransaction/{id}', 'get', metadata);
    };
    /**
     * Retrieves a list of asset transactions by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2AssettransactionGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssettransactionGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssettransactionGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssettransactionGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2AssettransactionGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/AssetTransaction/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all asset transactions with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssettransactionResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssettransactionResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssettransactionResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssettransactionResponse500> Server Error
     */
    SDK.prototype.getApiV2Assettransaction = function (metadata) {
        return this.core.fetch('/api/v2/AssetTransaction', 'get', metadata);
    };
    /**
     * Retrieves all attribute collections with filtering options.
     * Attribute collections include fields related to each asset, such as year, make, and
     * model.
     *
     * @throws FetchError<400, types.GetApiV2AttributecollectionResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AttributecollectionResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AttributecollectionResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AttributecollectionResponse500> Server Error
     */
    SDK.prototype.getApiV2Attributecollection = function (metadata) {
        return this.core.fetch('/api/v2/AttributeCollection', 'get', metadata);
    };
    /**
     * Retrieves the details of a specific asset attribute by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AttributesIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AttributesIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AttributesIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AttributesIdResponse500> Server Error
     */
    SDK.prototype.getApiV2AttributesId = function (metadata) {
        return this.core.fetch('/api/v2/Attributes/{id}', 'get', metadata);
    };
    /**
     * Retrieves all asset attributes with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AttributesResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AttributesResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AttributesResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AttributesResponse500> Server Error
     */
    SDK.prototype.getApiV2Attributes = function (metadata) {
        return this.core.fetch('/api/v2/Attributes', 'get', metadata);
    };
    /**
     * Authenticates a user and generates a JWT token.
     *
     * @throws FetchError<400, types.PostApiV2AuthenticationResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AuthenticationResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AuthenticationResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AuthenticationResponse500> Server Error
     */
    SDK.prototype.postApiV2Authentication = function (body) {
        return this.core.fetch('/api/v2/Authentication', 'post', body);
    };
    /**
     * Refreshes a JWT token using an expired token and a refresh token.
     *
     * @throws FetchError<400, types.PostApiV2AuthenticationRefreshtokenResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AuthenticationRefreshtokenResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AuthenticationRefreshtokenResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AuthenticationRefreshtokenResponse500> Server Error
     */
    SDK.prototype.postApiV2AuthenticationRefreshtoken = function (metadata) {
        return this.core.fetch('/api/v2/Authentication/RefreshToken', 'post', metadata);
    };
    /**
     * Retrieves a fob by its ID.
     *
     * @throws FetchError<400, types.GetApiV2FobIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobIdResponse500> Server Error
     */
    SDK.prototype.getApiV2FobId = function (metadata) {
        return this.core.fetch('/api/v2/Fob/{id}', 'get', metadata);
    };
    /**
     * Retrieves a list of fobs by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2FobGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2FobGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/Fob/GetByList', 'get', metadata);
    };
    /**
     * Retrieves a list of fobs by their fob numbers.
     *
     * @throws FetchError<400, types.GetApiV2FobGetbylistFobnumbersResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobGetbylistFobnumbersResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobGetbylistFobnumbersResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobGetbylistFobnumbersResponse500> Server Error
     */
    SDK.prototype.getApiV2FobGetbylistFobnumbers = function (metadata) {
        return this.core.fetch('/api/v2/Fob/GetByList/FobNumbers', 'get', metadata);
    };
    /**
     * Retrieves all fobs with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2FobResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobResponse500> Server Error
     */
    SDK.prototype.getApiV2Fob = function (metadata) {
        return this.core.fetch('/api/v2/Fob', 'get', metadata);
    };
    /**
     * Retrieves all unattached fobs with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2FobGetallUnattachedfobsResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobGetallUnattachedfobsResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobGetallUnattachedfobsResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobGetallUnattachedfobsResponse500> Server Error
     */
    SDK.prototype.getApiV2FobGetallUnattachedfobs = function (metadata) {
        return this.core.fetch('/api/v2/Fob/GetAll/UnattachedFobs', 'get', metadata);
    };
    /**
     * Endpoint to perform a health check.
     *
     * @throws FetchError<400, types.GetApiV2HealthcheckResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2HealthcheckResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2HealthcheckResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2HealthcheckResponse500> Server Error
     */
    SDK.prototype.getApiV2Healthcheck = function () {
        return this.core.fetch('/api/v2/HealthCheck', 'get');
    };
    /**
     * Retrieves an inventory session by its ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionIdResponse500> Server Error
     */
    SDK.prototype.getApiV2InventorysessionId = function (metadata) {
        return this.core.fetch('/api/v2/InventorySession/{id}', 'get', metadata);
    };
    /**
     * Deletes an inventory session by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2InventorysessionIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2InventorysessionIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2InventorysessionIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2InventorysessionIdResponse500> Server Error
     */
    SDK.prototype.deleteApiV2InventorysessionId = function (metadata) {
        return this.core.fetch('/api/v2/InventorySession/{id}', 'delete', metadata);
    };
    /**
     * Retrieves inventory sessions by user ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionGetbyuseridIdResponse500> Server Error
     */
    SDK.prototype.getApiV2InventorysessionGetbyuseridId = function (metadata) {
        return this.core.fetch('/api/v2/InventorySession/GetByUserId/{id}', 'get', metadata);
    };
    /**
     * Retrieves inventory sessions by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2InventorysessionGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/InventorySession/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all inventory sessions with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionResponse500> Server Error
     */
    SDK.prototype.getApiV2Inventorysession = function (metadata) {
        return this.core.fetch('/api/v2/InventorySession', 'get', metadata);
    };
    /**
     * Creates a new inventory session.
     *
     * @throws FetchError<400, types.PostApiV2InventorysessionResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2InventorysessionResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2InventorysessionResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2InventorysessionResponse500> Server Error
     */
    SDK.prototype.postApiV2Inventorysession = function (body) {
        return this.core.fetch('/api/v2/InventorySession', 'post', body);
    };
    /**
     * Sets an inventory session as finished by its ID.
     *
     * @throws FetchError<400, types.PostApiV2InventorysessionIdSetfinishedResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2InventorysessionIdSetfinishedResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2InventorysessionIdSetfinishedResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2InventorysessionIdSetfinishedResponse500> Server Error
     */
    SDK.prototype.postApiV2InventorysessionIdSetfinished = function (metadata) {
        return this.core.fetch('/api/v2/InventorySession/{id}/SetFinished', 'post', metadata);
    };
    /**
     * Retrieves an inventory session scan by its ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanIdResponse500> Server Error
     */
    SDK.prototype.getApiV2InventorysessionscanId = function (metadata) {
        return this.core.fetch('/api/v2/InventorySessionScan/{id}', 'get', metadata);
    };
    /**
     * Deletes an inventory session scan by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2InventorysessionscanIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2InventorysessionscanIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2InventorysessionscanIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2InventorysessionscanIdResponse500> Server Error
     */
    SDK.prototype.deleteApiV2InventorysessionscanId = function (metadata) {
        return this.core.fetch('/api/v2/InventorySessionScan/{id}', 'delete', metadata);
    };
    /**
     * Retrieves an inventory session scan by inventory session ID and scanned value.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse500> Server Error
     */
    SDK.prototype.getApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValue = function (metadata) {
        return this.core.fetch('/api/v2/InventorySessionScan/GetByInventorySessionId/{id}/ScannedValue/{value}', 'get', metadata);
    };
    /**
     * Retrieves all inventory session scans with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanResponse500> Server Error
     */
    SDK.prototype.getApiV2Inventorysessionscan = function (metadata) {
        return this.core.fetch('/api/v2/InventorySessionScan', 'get', metadata);
    };
    /**
     * Creates a new inventory session scan.
     *
     * @throws FetchError<400, types.PostApiV2InventorysessionscanResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2InventorysessionscanResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2InventorysessionscanResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2InventorysessionscanResponse500> Server Error
     */
    SDK.prototype.postApiV2Inventorysessionscan = function (body) {
        return this.core.fetch('/api/v2/InventorySessionScan', 'post', body);
    };
    /**
     * First attempts to update an inventory session scan pre-generated from the initial
     * inventory session creation.
     * If an inventory session scan does not match the request's ScannedValue, a new inventory
     * session scan is created.
     *
     * @throws FetchError<400, types.PutApiV2InventorysessionscanResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2InventorysessionscanResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2InventorysessionscanResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2InventorysessionscanResponse500> Server Error
     */
    SDK.prototype.putApiV2Inventorysessionscan = function (body) {
        return this.core.fetch('/api/v2/InventorySessionScan', 'put', body);
    };
    /**
     * Retrieves all inventory session scans by inventory session ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2InventorysessionscanGetbyinventorysessionidId = function (metadata) {
        return this.core.fetch('/api/v2/InventorySessionScan/GetByInventorySessionId/{id}', 'get', metadata);
    };
    /**
     * Retrieves an issue reason by its ID.
     *
     * @throws FetchError<400, types.GetApiV2IssuereasonIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2IssuereasonIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2IssuereasonIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2IssuereasonIdResponse500> Server Error
     */
    SDK.prototype.getApiV2IssuereasonId = function (metadata) {
        return this.core.fetch('/api/v2/IssueReason/{id}', 'get', metadata);
    };
    /**
     * Retrieves all issue reasons with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2IssuereasonResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2IssuereasonResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2IssuereasonResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2IssuereasonResponse500> Server Error
     */
    SDK.prototype.getApiV2Issuereason = function (metadata) {
        return this.core.fetch('/api/v2/IssueReason', 'get', metadata);
    };
    /**
     * Retrieves a lot location by its ID.
     *
     * @throws FetchError<400, types.GetApiV2LotlocationIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2LotlocationIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2LotlocationIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2LotlocationIdResponse500> Server Error
     */
    SDK.prototype.getApiV2LotlocationId = function (metadata) {
        return this.core.fetch('/api/v2/LotLocation/{id}', 'get', metadata);
    };
    /**
     * Retrieves a list of lot locations by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2LotlocationGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2LotlocationGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2LotlocationGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2LotlocationGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2LotlocationGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/LotLocation/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all lot locations with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2LotlocationResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2LotlocationResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2LotlocationResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2LotlocationResponse500> Server Error
     */
    SDK.prototype.getApiV2Lotlocation = function (metadata) {
        return this.core.fetch('/api/v2/LotLocation', 'get', metadata);
    };
    /**
     * Retrieves a parking space by its ID.
     *
     * @throws FetchError<400, types.GetApiV2ParkingspaceIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ParkingspaceIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ParkingspaceIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ParkingspaceIdResponse500> Server Error
     */
    SDK.prototype.getApiV2ParkingspaceId = function (metadata) {
        return this.core.fetch('/api/v2/ParkingSpace/{id}', 'get', metadata);
    };
    /**
     * Retrieves a list of parking spaces by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2ParkingspaceGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ParkingspaceGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ParkingspaceGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ParkingspaceGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2ParkingspaceGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/ParkingSpace/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all parking spaces with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2ParkingspaceResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ParkingspaceResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ParkingspaceResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ParkingspaceResponse500> Server Error
     */
    SDK.prototype.getApiV2Parkingspace = function (metadata) {
        return this.core.fetch('/api/v2/ParkingSpace', 'get', metadata);
    };
    /**
     * Retrieves a process step by its ID.
     *
     * @throws FetchError<400, types.GetApiV2ProcessstepIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ProcessstepIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ProcessstepIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ProcessstepIdResponse500> Server Error
     */
    SDK.prototype.getApiV2ProcessstepId = function (metadata) {
        return this.core.fetch('/api/v2/ProcessStep/{id}', 'get', metadata);
    };
    /**
     * Retrieves a list of process steps by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2ProcessstepGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ProcessstepGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ProcessstepGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ProcessstepGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2ProcessstepGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/ProcessStep/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all process steps with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2ProcessstepResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ProcessstepResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ProcessstepResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ProcessstepResponse500> Server Error
     */
    SDK.prototype.getApiV2Processstep = function (metadata) {
        return this.core.fetch('/api/v2/ProcessStep', 'get', metadata);
    };
    /**
     * Retrieves a reservation by its ID.
     *
     * @throws FetchError<400, types.GetApiV2ReservationIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationIdResponse500> Server Error
     */
    SDK.prototype.getApiV2ReservationId = function (metadata) {
        return this.core.fetch('/api/v2/Reservation/{id}', 'get', metadata);
    };
    /**
     * Deletes a reservation by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2ReservationIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2ReservationIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2ReservationIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2ReservationIdResponse500> Server Error
     */
    SDK.prototype.deleteApiV2ReservationId = function (metadata) {
        return this.core.fetch('/api/v2/Reservation/{id}', 'delete', metadata);
    };
    SDK.prototype.putApiV2ReservationId = function (body, metadata) {
        return this.core.fetch('/api/v2/Reservation/{id}', 'put', body, metadata);
    };
    /**
     * Retrieves a list of reservations by user ID.
     *
     * @throws FetchError<400, types.GetApiV2ReservationGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationGetbyuseridIdResponse500> Server Error
     */
    SDK.prototype.getApiV2ReservationGetbyuseridId = function (metadata) {
        return this.core.fetch('/api/v2/Reservation/GetByUserId/{id}', 'get', metadata);
    };
    /**
     * Retrieves a list of reservations by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2ReservationGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2ReservationGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/Reservation/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all reservations with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2ReservationResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationResponse500> Server Error
     */
    SDK.prototype.getApiV2Reservation = function (metadata) {
        return this.core.fetch('/api/v2/Reservation', 'get', metadata);
    };
    /**
     * Creates a new reservation.
     *
     * @throws FetchError<400, types.PostApiV2ReservationResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2ReservationResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2ReservationResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2ReservationResponse500> Server Error
     */
    SDK.prototype.postApiV2Reservation = function (body) {
        return this.core.fetch('/api/v2/Reservation', 'post', body);
    };
    /**
     * Creates a quick reservation for an asset.
     *
     * @throws FetchError<400, types.PostApiV2ReservationQuickreserveResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2ReservationQuickreserveResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2ReservationQuickreserveResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2ReservationQuickreserveResponse500> Server Error
     */
    SDK.prototype.postApiV2ReservationQuickreserve = function (metadata) {
        return this.core.fetch('/api/v2/Reservation/QuickReserve', 'post', metadata);
    };
    /**
     * Retrieves assets by reservation ID.
     *
     * @throws FetchError<400, types.GetApiV2ReservationassetGetbyreservationidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationassetGetbyreservationidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationassetGetbyreservationidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationassetGetbyreservationidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2ReservationassetGetbyreservationidId = function (metadata) {
        return this.core.fetch('/api/v2/ReservationAsset/GetByReservationId/{id}', 'get', metadata);
    };
    /**
     * Retrieves all socket maps by cabinet ID.
     *
     * @throws FetchError<400, types.GetApiV2SocketmapGetallbycabinetidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SocketmapGetallbycabinetidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SocketmapGetallbycabinetidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SocketmapGetallbycabinetidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2SocketmapGetallbycabinetidId = function (metadata) {
        return this.core.fetch('/api/v2/SocketMap/GetAllByCabinetId/{id}', 'get', metadata);
    };
    /**
     * Retrieves a system by its ID.
     *
     * @throws FetchError<400, types.GetApiV2SystemIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemIdResponse500> Server Error
     */
    SDK.prototype.getApiV2SystemId = function (metadata) {
        return this.core.fetch('/api/v2/System/{id}', 'get', metadata);
    };
    /**
     * Retrieves systems by user access group ID.
     *
     * @throws FetchError<400, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2SystemGetbyuseraccessgroupidId = function (metadata) {
        return this.core.fetch('/api/v2/System/GetByUserAccessGroupId/{id}', 'get', metadata);
    };
    /**
     * Retrieves systems by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2SystemGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2SystemGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/System/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all systems with pagination.
     *
     * @throws FetchError<400, types.GetApiV2SystemResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemResponse500> Server Error
     */
    SDK.prototype.getApiV2System = function (metadata) {
        return this.core.fetch('/api/v2/System', 'get', metadata);
    };
    /**
     * Retrieves a user by its ID.
     *
     * @throws FetchError<400, types.GetApiV2UserIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserIdResponse500> Server Error
     */
    SDK.prototype.getApiV2UserId = function (metadata) {
        return this.core.fetch('/api/v2/User/{id}', 'get', metadata);
    };
    /**
     * Deletes a user by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2UserIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UserIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UserIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UserIdResponse500> Server Error
     */
    SDK.prototype.deleteApiV2UserId = function (metadata) {
        return this.core.fetch('/api/v2/User/{id}', 'delete', metadata);
    };
    SDK.prototype.putApiV2UserId = function (body, metadata) {
        return this.core.fetch('/api/v2/User/{id}', 'put', body, metadata);
    };
    /**
     * Retrieves users by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2UserGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2UserGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/User/GetByList', 'get', metadata);
    };
    /**
     * Retrieves all users with pagination.
     *
     * @throws FetchError<400, types.GetApiV2UserResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserResponse500> Server Error
     */
    SDK.prototype.getApiV2User = function (metadata) {
        return this.core.fetch('/api/v2/User', 'get', metadata);
    };
    /**
     * Creates a new user.
     *
     * @throws FetchError<400, types.PostApiV2UserResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2UserResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2UserResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2UserResponse500> Server Error
     */
    SDK.prototype.postApiV2User = function (body) {
        return this.core.fetch('/api/v2/User', 'post', body);
    };
    /**
     * Retrieves users by user access group ID.
     *
     * @throws FetchError<400, types.GetApiV2UserGetbyuseraccessgroupidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserGetbyuseraccessgroupidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserGetbyuseraccessgroupidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserGetbyuseraccessgroupidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2UserGetbyuseraccessgroupidId = function (metadata) {
        return this.core.fetch('/api/v2/User/GetByUserAccessGroupId/{id}', 'get', metadata);
    };
    /**
     * Retrieves a user by external ID.
     *
     * @throws FetchError<400, types.GetApiV2UserGetbyexternalidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserGetbyexternalidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserGetbyexternalidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserGetbyexternalidIdResponse500> Server Error
     */
    SDK.prototype.getApiV2UserGetbyexternalidId = function (metadata) {
        return this.core.fetch('/api/v2/User/GetByExternalId/{id}', 'get', metadata);
    };
    /**
     * Deletes users by a list of IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2UserDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UserDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UserDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UserDeletebylistResponse500> Server Error
     */
    SDK.prototype.deleteApiV2UserDeletebylist = function (metadata) {
        return this.core.fetch('/api/v2/User/DeleteByList', 'delete', metadata);
    };
    SDK.prototype.postApiV2UserIdChangepassword = function (body, metadata) {
        return this.core.fetch('/api/v2/User/{id}/ChangePassword', 'post', body, metadata);
    };
    /**
     * Retrieves all user access groups with pagination.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupResponse500> Server Error
     */
    SDK.prototype.getApiV2Useraccessgroup = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup', 'get', metadata);
    };
    /**
     * Creates a new user access group.
     *
     * @throws FetchError<400, types.PostApiV2UseraccessgroupResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2UseraccessgroupResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2UseraccessgroupResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2UseraccessgroupResponse500> Server Error
     */
    SDK.prototype.postApiV2Useraccessgroup = function (body) {
        return this.core.fetch('/api/v2/UserAccessGroup', 'post', body);
    };
    /**
     * Retrieves a user access group by its ID.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupIdResponse500> Server Error
     */
    SDK.prototype.getApiV2UseraccessgroupId = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}', 'get', metadata);
    };
    /**
     * Deletes a user access group by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2UseraccessgroupIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UseraccessgroupIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UseraccessgroupIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UseraccessgroupIdResponse500> Server Error
     */
    SDK.prototype.deleteApiV2UseraccessgroupId = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}', 'delete', metadata);
    };
    SDK.prototype.putApiV2UseraccessgroupId = function (body, metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}', 'put', body, metadata);
    };
    /**
     * Retrieves user access groups by user ID.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupGetbyuseridIdResponse500> Server Error
     */
    SDK.prototype.getApiV2UseraccessgroupGetbyuseridId = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/GetByUserId/{id}', 'get', metadata);
    };
    /**
     * Retrieves user access groups by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupGetbylistResponse500> Server Error
     */
    SDK.prototype.getApiV2UseraccessgroupGetbylist = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/GetByList', 'get', metadata);
    };
    /**
     * Deletes user access groups by a list of IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2UseraccessgroupDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UseraccessgroupDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UseraccessgroupDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UseraccessgroupDeletebylistResponse500> Server Error
     */
    SDK.prototype.deleteApiV2UseraccessgroupDeletebylist = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/DeleteByList', 'delete', metadata);
    };
    /**
     * Assigns users to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssignusersResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssignusersResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssignusersResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssignusersResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdAssignusers = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/AssignUsers', 'put', metadata);
    };
    /**
     * Unassigns users from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassignusersResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassignusersResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassignusersResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassignusersResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdUnassignusers = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/UnassignUsers', 'put', metadata);
    };
    /**
     * Assigns assets to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssignassetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssignassetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssignassetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssignassetsResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdAssignassets = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/AssignAssets', 'put', metadata);
    };
    /**
     * Unassigns assets from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassignassetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassignassetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassignassetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassignassetsResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdUnassignassets = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/UnassignAssets', 'put', metadata);
    };
    /**
     * Assigns systems to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssignsystemsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssignsystemsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssignsystemsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssignsystemsResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdAssignsystems = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/AssignSystems', 'put', metadata);
    };
    /**
     * Unassigns systems from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdUnassignsystems = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/UnassignSystems', 'put', metadata);
    };
    /**
     * Assigns cabinets to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdAssigncabinets = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/AssignCabinets', 'put', metadata);
    };
    /**
     * Unassigns cabinets from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse500> Server Error
     */
    SDK.prototype.putApiV2UseraccessgroupIdUnassigncabinets = function (metadata) {
        return this.core.fetch('/api/v2/UserAccessGroup/{id}/UnassignCabinets', 'put', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
