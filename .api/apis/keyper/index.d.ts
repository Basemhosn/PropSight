import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Retrieves the access time details for a specific ID.
     *
     * @throws FetchError<400, types.GetApiV2AccesstimeIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AccesstimeIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AccesstimeIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AccesstimeIdResponse500> Server Error
     */
    getApiV2AccesstimeId(metadata: types.GetApiV2AccesstimeIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AccesstimeIdResponse200>>;
    /**
     * Updates the details of a specific access time entry.
     *
     * @throws FetchError<400, types.PutApiV2AccesstimeIdResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2AccesstimeIdResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2AccesstimeIdResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2AccesstimeIdResponse500> Server Error
     */
    putApiV2AccesstimeId(body: types.PutApiV2AccesstimeIdBodyParam, metadata: types.PutApiV2AccesstimeIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2AccesstimeIdResponse200>>;
    putApiV2AccesstimeId(metadata: types.PutApiV2AccesstimeIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2AccesstimeIdResponse200>>;
    /**
     * Creates a new access time entry.
     *
     * @throws FetchError<400, types.PostApiV2AccesstimeResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AccesstimeResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AccesstimeResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AccesstimeResponse500> Server Error
     */
    postApiV2Accesstime(body?: types.PostApiV2AccesstimeBodyParam): Promise<FetchResponse<200, types.PostApiV2AccesstimeResponse200>>;
    /**
     * Deletes multiple access time entries by their IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2AccesstimeDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2AccesstimeDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2AccesstimeDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2AccesstimeDeletebylistResponse500> Server Error
     */
    deleteApiV2AccesstimeDeletebylist(metadata?: types.DeleteApiV2AccesstimeDeletebylistMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2AccesstimeDeletebylistResponse200>>;
    /**
     * Retrieves an asset by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetIdResponse500> Server Error
     */
    getApiV2AssetId(metadata: types.GetApiV2AssetIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetIdResponse200>>;
    /**
     * Deletes an asset by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2AssetIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2AssetIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2AssetIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2AssetIdResponse500> Server Error
     */
    deleteApiV2AssetId(metadata: types.DeleteApiV2AssetIdMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2AssetIdResponse200>>;
    /**
     * Updates an asset by its ID.
     *
     * @throws FetchError<400, types.PutApiV2AssetIdResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2AssetIdResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2AssetIdResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2AssetIdResponse500> Server Error
     */
    putApiV2AssetId(body: types.PutApiV2AssetIdBodyParam, metadata: types.PutApiV2AssetIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2AssetIdResponse200>>;
    putApiV2AssetId(metadata: types.PutApiV2AssetIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2AssetIdResponse200>>;
    /**
     * Retrieves assets by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbylistResponse500> Server Error
     */
    getApiV2AssetGetbylist(metadata?: types.GetApiV2AssetGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetGetbylistResponse200>>;
    /**
     * Retrieves assets by user ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyuseridIdResponse500> Server Error
     */
    getApiV2AssetGetbyuseridId(metadata: types.GetApiV2AssetGetbyuseridIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetGetbyuseridIdResponse200>>;
    /**
     * Retrieves an asset by its FOB tag.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyfobtagTagResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyfobtagTagResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyfobtagTagResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyfobtagTagResponse500> Server Error
     */
    getApiV2AssetGetbyfobtagTag(metadata: types.GetApiV2AssetGetbyfobtagTagMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetGetbyfobtagTagResponse200>>;
    /**
     * Retrieves an asset by its FOB serial number.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse500> Server Error
     */
    getApiV2AssetGetbyfobserialnumberSerialnumber(metadata: types.GetApiV2AssetGetbyfobserialnumberSerialnumberMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetGetbyfobserialnumberSerialnumberResponse200>>;
    /**
     * Retrieves assets by user access group ID with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse500> Server Error
     */
    getApiV2AssetGetbyuseraccessgroupidId(metadata: types.GetApiV2AssetGetbyuseraccessgroupidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetGetbyuseraccessgroupidIdResponse200>>;
    /**
     * Retrieves a spare key asset by parent asset ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetGetbyparentassetidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetGetbyparentassetidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetGetbyparentassetidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetGetbyparentassetidIdResponse500> Server Error
     */
    getApiV2AssetGetbyparentassetidId(metadata: types.GetApiV2AssetGetbyparentassetidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetGetbyparentassetidIdResponse200>>;
    /**
     * Retrieves all assets with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssetResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetResponse500> Server Error
     */
    getApiV2Asset(metadata?: types.GetApiV2AssetMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetResponse200>>;
    /**
     * Creates a new asset.
     *
     * @throws FetchError<400, types.PostApiV2AssetResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AssetResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AssetResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AssetResponse500> Server Error
     */
    postApiV2Asset(body?: types.PostApiV2AssetBodyParam): Promise<FetchResponse<200, types.PostApiV2AssetResponse200>>;
    /**
     * Deletes assets by a list of IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2AssetDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2AssetDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2AssetDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2AssetDeletebylistResponse500> Server Error
     */
    deleteApiV2AssetDeletebylist(metadata?: types.DeleteApiV2AssetDeletebylistMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2AssetDeletebylistResponse200>>;
    /**
     * Attaches a FOB to an asset.
     *
     * @throws FetchError<400, types.PostApiV2AssetIdAttachfobNumberResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AssetIdAttachfobNumberResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AssetIdAttachfobNumberResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AssetIdAttachfobNumberResponse500> Server Error
     */
    postApiV2AssetIdAttachfobNumber(metadata: types.PostApiV2AssetIdAttachfobNumberMetadataParam): Promise<FetchResponse<200, types.PostApiV2AssetIdAttachfobNumberResponse200>>;
    /**
     * Detaches a FOB from an asset.
     *
     * @throws FetchError<400, types.PostApiV2AssetIdDetachfobResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AssetIdDetachfobResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AssetIdDetachfobResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AssetIdDetachfobResponse500> Server Error
     */
    postApiV2AssetIdDetachfob(metadata: types.PostApiV2AssetIdDetachfobMetadataParam): Promise<FetchResponse<200, types.PostApiV2AssetIdDetachfobResponse200>>;
    /**
     * Retrieves an asset log entry by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AssetlogIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetlogIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetlogIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetlogIdResponse500> Server Error
     */
    getApiV2AssetlogId(metadata: types.GetApiV2AssetlogIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetlogIdResponse200>>;
    /**
     * Retrieves all asset log entries with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssetlogResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssetlogResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssetlogResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssetlogResponse500> Server Error
     */
    getApiV2Assetlog(metadata?: types.GetApiV2AssetlogMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssetlogResponse200>>;
    /**
     * Retrieves an asset transaction by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AssettransactionIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssettransactionIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssettransactionIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssettransactionIdResponse500> Server Error
     */
    getApiV2AssettransactionId(metadata: types.GetApiV2AssettransactionIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssettransactionIdResponse200>>;
    /**
     * Retrieves a list of asset transactions by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2AssettransactionGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssettransactionGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssettransactionGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssettransactionGetbylistResponse500> Server Error
     */
    getApiV2AssettransactionGetbylist(metadata?: types.GetApiV2AssettransactionGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssettransactionGetbylistResponse200>>;
    /**
     * Retrieves all asset transactions with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AssettransactionResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AssettransactionResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AssettransactionResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AssettransactionResponse500> Server Error
     */
    getApiV2Assettransaction(metadata?: types.GetApiV2AssettransactionMetadataParam): Promise<FetchResponse<200, types.GetApiV2AssettransactionResponse200>>;
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
    getApiV2Attributecollection(metadata?: types.GetApiV2AttributecollectionMetadataParam): Promise<FetchResponse<200, types.GetApiV2AttributecollectionResponse200>>;
    /**
     * Retrieves the details of a specific asset attribute by its ID.
     *
     * @throws FetchError<400, types.GetApiV2AttributesIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AttributesIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AttributesIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AttributesIdResponse500> Server Error
     */
    getApiV2AttributesId(metadata: types.GetApiV2AttributesIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2AttributesIdResponse200>>;
    /**
     * Retrieves all asset attributes with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2AttributesResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2AttributesResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2AttributesResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2AttributesResponse500> Server Error
     */
    getApiV2Attributes(metadata?: types.GetApiV2AttributesMetadataParam): Promise<FetchResponse<200, types.GetApiV2AttributesResponse200>>;
    /**
     * Authenticates a user and generates a JWT token.
     *
     * @throws FetchError<400, types.PostApiV2AuthenticationResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AuthenticationResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AuthenticationResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AuthenticationResponse500> Server Error
     */
    postApiV2Authentication(body?: types.PostApiV2AuthenticationBodyParam): Promise<FetchResponse<200, types.PostApiV2AuthenticationResponse200>>;
    /**
     * Refreshes a JWT token using an expired token and a refresh token.
     *
     * @throws FetchError<400, types.PostApiV2AuthenticationRefreshtokenResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2AuthenticationRefreshtokenResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2AuthenticationRefreshtokenResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2AuthenticationRefreshtokenResponse500> Server Error
     */
    postApiV2AuthenticationRefreshtoken(metadata?: types.PostApiV2AuthenticationRefreshtokenMetadataParam): Promise<FetchResponse<200, types.PostApiV2AuthenticationRefreshtokenResponse200>>;
    /**
     * Retrieves a fob by its ID.
     *
     * @throws FetchError<400, types.GetApiV2FobIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobIdResponse500> Server Error
     */
    getApiV2FobId(metadata: types.GetApiV2FobIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2FobIdResponse200>>;
    /**
     * Retrieves a list of fobs by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2FobGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobGetbylistResponse500> Server Error
     */
    getApiV2FobGetbylist(metadata?: types.GetApiV2FobGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2FobGetbylistResponse200>>;
    /**
     * Retrieves a list of fobs by their fob numbers.
     *
     * @throws FetchError<400, types.GetApiV2FobGetbylistFobnumbersResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobGetbylistFobnumbersResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobGetbylistFobnumbersResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobGetbylistFobnumbersResponse500> Server Error
     */
    getApiV2FobGetbylistFobnumbers(metadata?: types.GetApiV2FobGetbylistFobnumbersMetadataParam): Promise<FetchResponse<200, types.GetApiV2FobGetbylistFobnumbersResponse200>>;
    /**
     * Retrieves all fobs with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2FobResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobResponse500> Server Error
     */
    getApiV2Fob(metadata?: types.GetApiV2FobMetadataParam): Promise<FetchResponse<200, types.GetApiV2FobResponse200>>;
    /**
     * Retrieves all unattached fobs with filtering options.
     *
     * @throws FetchError<400, types.GetApiV2FobGetallUnattachedfobsResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2FobGetallUnattachedfobsResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2FobGetallUnattachedfobsResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2FobGetallUnattachedfobsResponse500> Server Error
     */
    getApiV2FobGetallUnattachedfobs(metadata?: types.GetApiV2FobGetallUnattachedfobsMetadataParam): Promise<FetchResponse<200, types.GetApiV2FobGetallUnattachedfobsResponse200>>;
    /**
     * Endpoint to perform a health check.
     *
     * @throws FetchError<400, types.GetApiV2HealthcheckResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2HealthcheckResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2HealthcheckResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2HealthcheckResponse500> Server Error
     */
    getApiV2Healthcheck(): Promise<FetchResponse<200, types.GetApiV2HealthcheckResponse200>>;
    /**
     * Retrieves an inventory session by its ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionIdResponse500> Server Error
     */
    getApiV2InventorysessionId(metadata: types.GetApiV2InventorysessionIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionIdResponse200>>;
    /**
     * Deletes an inventory session by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2InventorysessionIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2InventorysessionIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2InventorysessionIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2InventorysessionIdResponse500> Server Error
     */
    deleteApiV2InventorysessionId(metadata: types.DeleteApiV2InventorysessionIdMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2InventorysessionIdResponse200>>;
    /**
     * Retrieves inventory sessions by user ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionGetbyuseridIdResponse500> Server Error
     */
    getApiV2InventorysessionGetbyuseridId(metadata: types.GetApiV2InventorysessionGetbyuseridIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionGetbyuseridIdResponse200>>;
    /**
     * Retrieves inventory sessions by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionGetbylistResponse500> Server Error
     */
    getApiV2InventorysessionGetbylist(metadata?: types.GetApiV2InventorysessionGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionGetbylistResponse200>>;
    /**
     * Retrieves all inventory sessions with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionResponse500> Server Error
     */
    getApiV2Inventorysession(metadata?: types.GetApiV2InventorysessionMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionResponse200>>;
    /**
     * Creates a new inventory session.
     *
     * @throws FetchError<400, types.PostApiV2InventorysessionResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2InventorysessionResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2InventorysessionResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2InventorysessionResponse500> Server Error
     */
    postApiV2Inventorysession(body?: types.PostApiV2InventorysessionBodyParam): Promise<FetchResponse<200, types.PostApiV2InventorysessionResponse200>>;
    /**
     * Sets an inventory session as finished by its ID.
     *
     * @throws FetchError<400, types.PostApiV2InventorysessionIdSetfinishedResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2InventorysessionIdSetfinishedResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2InventorysessionIdSetfinishedResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2InventorysessionIdSetfinishedResponse500> Server Error
     */
    postApiV2InventorysessionIdSetfinished(metadata: types.PostApiV2InventorysessionIdSetfinishedMetadataParam): Promise<FetchResponse<200, types.PostApiV2InventorysessionIdSetfinishedResponse200>>;
    /**
     * Retrieves an inventory session scan by its ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanIdResponse500> Server Error
     */
    getApiV2InventorysessionscanId(metadata: types.GetApiV2InventorysessionscanIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionscanIdResponse200>>;
    /**
     * Deletes an inventory session scan by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2InventorysessionscanIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2InventorysessionscanIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2InventorysessionscanIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2InventorysessionscanIdResponse500> Server Error
     */
    deleteApiV2InventorysessionscanId(metadata: types.DeleteApiV2InventorysessionscanIdMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2InventorysessionscanIdResponse200>>;
    /**
     * Retrieves an inventory session scan by inventory session ID and scanned value.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse500> Server Error
     */
    getApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValue(metadata: types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValueResponse200>>;
    /**
     * Retrieves all inventory session scans with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanResponse500> Server Error
     */
    getApiV2Inventorysessionscan(metadata?: types.GetApiV2InventorysessionscanMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionscanResponse200>>;
    /**
     * Creates a new inventory session scan.
     *
     * @throws FetchError<400, types.PostApiV2InventorysessionscanResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2InventorysessionscanResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2InventorysessionscanResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2InventorysessionscanResponse500> Server Error
     */
    postApiV2Inventorysessionscan(body?: types.PostApiV2InventorysessionscanBodyParam): Promise<FetchResponse<200, types.PostApiV2InventorysessionscanResponse200>>;
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
    putApiV2Inventorysessionscan(body?: types.PutApiV2InventorysessionscanBodyParam): Promise<FetchResponse<200, types.PutApiV2InventorysessionscanResponse200>>;
    /**
     * Retrieves all inventory session scans by inventory session ID.
     *
     * @throws FetchError<400, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse500> Server Error
     */
    getApiV2InventorysessionscanGetbyinventorysessionidId(metadata: types.GetApiV2InventorysessionscanGetbyinventorysessionidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2InventorysessionscanGetbyinventorysessionidIdResponse200>>;
    /**
     * Retrieves an issue reason by its ID.
     *
     * @throws FetchError<400, types.GetApiV2IssuereasonIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2IssuereasonIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2IssuereasonIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2IssuereasonIdResponse500> Server Error
     */
    getApiV2IssuereasonId(metadata: types.GetApiV2IssuereasonIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2IssuereasonIdResponse200>>;
    /**
     * Retrieves all issue reasons with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2IssuereasonResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2IssuereasonResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2IssuereasonResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2IssuereasonResponse500> Server Error
     */
    getApiV2Issuereason(metadata?: types.GetApiV2IssuereasonMetadataParam): Promise<FetchResponse<200, types.GetApiV2IssuereasonResponse200>>;
    /**
     * Retrieves a lot location by its ID.
     *
     * @throws FetchError<400, types.GetApiV2LotlocationIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2LotlocationIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2LotlocationIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2LotlocationIdResponse500> Server Error
     */
    getApiV2LotlocationId(metadata: types.GetApiV2LotlocationIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2LotlocationIdResponse200>>;
    /**
     * Retrieves a list of lot locations by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2LotlocationGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2LotlocationGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2LotlocationGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2LotlocationGetbylistResponse500> Server Error
     */
    getApiV2LotlocationGetbylist(metadata?: types.GetApiV2LotlocationGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2LotlocationGetbylistResponse200>>;
    /**
     * Retrieves all lot locations with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2LotlocationResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2LotlocationResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2LotlocationResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2LotlocationResponse500> Server Error
     */
    getApiV2Lotlocation(metadata?: types.GetApiV2LotlocationMetadataParam): Promise<FetchResponse<200, types.GetApiV2LotlocationResponse200>>;
    /**
     * Retrieves a parking space by its ID.
     *
     * @throws FetchError<400, types.GetApiV2ParkingspaceIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ParkingspaceIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ParkingspaceIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ParkingspaceIdResponse500> Server Error
     */
    getApiV2ParkingspaceId(metadata: types.GetApiV2ParkingspaceIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2ParkingspaceIdResponse200>>;
    /**
     * Retrieves a list of parking spaces by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2ParkingspaceGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ParkingspaceGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ParkingspaceGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ParkingspaceGetbylistResponse500> Server Error
     */
    getApiV2ParkingspaceGetbylist(metadata?: types.GetApiV2ParkingspaceGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2ParkingspaceGetbylistResponse200>>;
    /**
     * Retrieves all parking spaces with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2ParkingspaceResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ParkingspaceResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ParkingspaceResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ParkingspaceResponse500> Server Error
     */
    getApiV2Parkingspace(metadata?: types.GetApiV2ParkingspaceMetadataParam): Promise<FetchResponse<200, types.GetApiV2ParkingspaceResponse200>>;
    /**
     * Retrieves a process step by its ID.
     *
     * @throws FetchError<400, types.GetApiV2ProcessstepIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ProcessstepIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ProcessstepIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ProcessstepIdResponse500> Server Error
     */
    getApiV2ProcessstepId(metadata: types.GetApiV2ProcessstepIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2ProcessstepIdResponse200>>;
    /**
     * Retrieves a list of process steps by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2ProcessstepGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ProcessstepGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ProcessstepGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ProcessstepGetbylistResponse500> Server Error
     */
    getApiV2ProcessstepGetbylist(metadata?: types.GetApiV2ProcessstepGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2ProcessstepGetbylistResponse200>>;
    /**
     * Retrieves all process steps with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2ProcessstepResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ProcessstepResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ProcessstepResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ProcessstepResponse500> Server Error
     */
    getApiV2Processstep(metadata?: types.GetApiV2ProcessstepMetadataParam): Promise<FetchResponse<200, types.GetApiV2ProcessstepResponse200>>;
    /**
     * Retrieves a reservation by its ID.
     *
     * @throws FetchError<400, types.GetApiV2ReservationIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationIdResponse500> Server Error
     */
    getApiV2ReservationId(metadata: types.GetApiV2ReservationIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2ReservationIdResponse200>>;
    /**
     * Deletes a reservation by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2ReservationIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2ReservationIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2ReservationIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2ReservationIdResponse500> Server Error
     */
    deleteApiV2ReservationId(metadata: types.DeleteApiV2ReservationIdMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2ReservationIdResponse200>>;
    /**
     * Updates a reservation by its ID.
     *
     * @throws FetchError<400, types.PutApiV2ReservationIdResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2ReservationIdResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2ReservationIdResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2ReservationIdResponse500> Server Error
     */
    putApiV2ReservationId(body: types.PutApiV2ReservationIdBodyParam, metadata: types.PutApiV2ReservationIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2ReservationIdResponse200>>;
    putApiV2ReservationId(metadata: types.PutApiV2ReservationIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2ReservationIdResponse200>>;
    /**
     * Retrieves a list of reservations by user ID.
     *
     * @throws FetchError<400, types.GetApiV2ReservationGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationGetbyuseridIdResponse500> Server Error
     */
    getApiV2ReservationGetbyuseridId(metadata: types.GetApiV2ReservationGetbyuseridIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2ReservationGetbyuseridIdResponse200>>;
    /**
     * Retrieves a list of reservations by their IDs.
     *
     * @throws FetchError<400, types.GetApiV2ReservationGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationGetbylistResponse500> Server Error
     */
    getApiV2ReservationGetbylist(metadata?: types.GetApiV2ReservationGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2ReservationGetbylistResponse200>>;
    /**
     * Retrieves all reservations with optional filtering.
     *
     * @throws FetchError<400, types.GetApiV2ReservationResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationResponse500> Server Error
     */
    getApiV2Reservation(metadata?: types.GetApiV2ReservationMetadataParam): Promise<FetchResponse<200, types.GetApiV2ReservationResponse200>>;
    /**
     * Creates a new reservation.
     *
     * @throws FetchError<400, types.PostApiV2ReservationResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2ReservationResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2ReservationResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2ReservationResponse500> Server Error
     */
    postApiV2Reservation(body?: types.PostApiV2ReservationBodyParam): Promise<FetchResponse<200, types.PostApiV2ReservationResponse200>>;
    /**
     * Creates a quick reservation for an asset.
     *
     * @throws FetchError<400, types.PostApiV2ReservationQuickreserveResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2ReservationQuickreserveResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2ReservationQuickreserveResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2ReservationQuickreserveResponse500> Server Error
     */
    postApiV2ReservationQuickreserve(metadata?: types.PostApiV2ReservationQuickreserveMetadataParam): Promise<FetchResponse<200, types.PostApiV2ReservationQuickreserveResponse200>>;
    /**
     * Retrieves assets by reservation ID.
     *
     * @throws FetchError<400, types.GetApiV2ReservationassetGetbyreservationidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2ReservationassetGetbyreservationidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2ReservationassetGetbyreservationidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2ReservationassetGetbyreservationidIdResponse500> Server Error
     */
    getApiV2ReservationassetGetbyreservationidId(metadata: types.GetApiV2ReservationassetGetbyreservationidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2ReservationassetGetbyreservationidIdResponse200>>;
    /**
     * Retrieves all socket maps by cabinet ID.
     *
     * @throws FetchError<400, types.GetApiV2SocketmapGetallbycabinetidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SocketmapGetallbycabinetidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SocketmapGetallbycabinetidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SocketmapGetallbycabinetidIdResponse500> Server Error
     */
    getApiV2SocketmapGetallbycabinetidId(metadata: types.GetApiV2SocketmapGetallbycabinetidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2SocketmapGetallbycabinetidIdResponse200>>;
    /**
     * Retrieves a system by its ID.
     *
     * @throws FetchError<400, types.GetApiV2SystemIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemIdResponse500> Server Error
     */
    getApiV2SystemId(metadata: types.GetApiV2SystemIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2SystemIdResponse200>>;
    /**
     * Retrieves systems by user access group ID.
     *
     * @throws FetchError<400, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse500> Server Error
     */
    getApiV2SystemGetbyuseraccessgroupidId(metadata: types.GetApiV2SystemGetbyuseraccessgroupidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2SystemGetbyuseraccessgroupidIdResponse200>>;
    /**
     * Retrieves systems by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2SystemGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemGetbylistResponse500> Server Error
     */
    getApiV2SystemGetbylist(metadata?: types.GetApiV2SystemGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2SystemGetbylistResponse200>>;
    /**
     * Retrieves all systems with pagination.
     *
     * @throws FetchError<400, types.GetApiV2SystemResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2SystemResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2SystemResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2SystemResponse500> Server Error
     */
    getApiV2System(metadata?: types.GetApiV2SystemMetadataParam): Promise<FetchResponse<200, types.GetApiV2SystemResponse200>>;
    /**
     * Retrieves a user by its ID.
     *
     * @throws FetchError<400, types.GetApiV2UserIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserIdResponse500> Server Error
     */
    getApiV2UserId(metadata: types.GetApiV2UserIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2UserIdResponse200>>;
    /**
     * Deletes a user by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2UserIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UserIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UserIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UserIdResponse500> Server Error
     */
    deleteApiV2UserId(metadata: types.DeleteApiV2UserIdMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2UserIdResponse200>>;
    /**
     * Updates a user by its ID.
     *
     * @throws FetchError<400, types.PutApiV2UserIdResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UserIdResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UserIdResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UserIdResponse500> Server Error
     */
    putApiV2UserId(body: types.PutApiV2UserIdBodyParam, metadata: types.PutApiV2UserIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2UserIdResponse200>>;
    putApiV2UserId(metadata: types.PutApiV2UserIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2UserIdResponse200>>;
    /**
     * Retrieves users by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2UserGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserGetbylistResponse500> Server Error
     */
    getApiV2UserGetbylist(metadata?: types.GetApiV2UserGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2UserGetbylistResponse200>>;
    /**
     * Retrieves all users with pagination.
     *
     * @throws FetchError<400, types.GetApiV2UserResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserResponse500> Server Error
     */
    getApiV2User(metadata?: types.GetApiV2UserMetadataParam): Promise<FetchResponse<200, types.GetApiV2UserResponse200>>;
    /**
     * Creates a new user.
     *
     * @throws FetchError<400, types.PostApiV2UserResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2UserResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2UserResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2UserResponse500> Server Error
     */
    postApiV2User(body?: types.PostApiV2UserBodyParam): Promise<FetchResponse<200, types.PostApiV2UserResponse200>>;
    /**
     * Retrieves users by user access group ID.
     *
     * @throws FetchError<400, types.GetApiV2UserGetbyuseraccessgroupidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserGetbyuseraccessgroupidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserGetbyuseraccessgroupidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserGetbyuseraccessgroupidIdResponse500> Server Error
     */
    getApiV2UserGetbyuseraccessgroupidId(metadata: types.GetApiV2UserGetbyuseraccessgroupidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2UserGetbyuseraccessgroupidIdResponse200>>;
    /**
     * Retrieves a user by external ID.
     *
     * @throws FetchError<400, types.GetApiV2UserGetbyexternalidIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UserGetbyexternalidIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UserGetbyexternalidIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UserGetbyexternalidIdResponse500> Server Error
     */
    getApiV2UserGetbyexternalidId(metadata: types.GetApiV2UserGetbyexternalidIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2UserGetbyexternalidIdResponse200>>;
    /**
     * Deletes users by a list of IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2UserDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UserDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UserDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UserDeletebylistResponse500> Server Error
     */
    deleteApiV2UserDeletebylist(metadata?: types.DeleteApiV2UserDeletebylistMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2UserDeletebylistResponse200>>;
    /**
     * Changes the password for a user.
     *
     * @throws FetchError<400, types.PostApiV2UserIdChangepasswordResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2UserIdChangepasswordResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2UserIdChangepasswordResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2UserIdChangepasswordResponse500> Server Error
     */
    postApiV2UserIdChangepassword(body: types.PostApiV2UserIdChangepasswordBodyParam, metadata: types.PostApiV2UserIdChangepasswordMetadataParam): Promise<FetchResponse<200, types.PostApiV2UserIdChangepasswordResponse200>>;
    postApiV2UserIdChangepassword(metadata: types.PostApiV2UserIdChangepasswordMetadataParam): Promise<FetchResponse<200, types.PostApiV2UserIdChangepasswordResponse200>>;
    /**
     * Retrieves all user access groups with pagination.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupResponse500> Server Error
     */
    getApiV2Useraccessgroup(metadata?: types.GetApiV2UseraccessgroupMetadataParam): Promise<FetchResponse<200, types.GetApiV2UseraccessgroupResponse200>>;
    /**
     * Creates a new user access group.
     *
     * @throws FetchError<400, types.PostApiV2UseraccessgroupResponse400> Bad Request
     * @throws FetchError<404, types.PostApiV2UseraccessgroupResponse404> Not Found
     * @throws FetchError<422, types.PostApiV2UseraccessgroupResponse422> Client Error
     * @throws FetchError<500, types.PostApiV2UseraccessgroupResponse500> Server Error
     */
    postApiV2Useraccessgroup(body?: types.PostApiV2UseraccessgroupBodyParam): Promise<FetchResponse<200, types.PostApiV2UseraccessgroupResponse200>>;
    /**
     * Retrieves a user access group by its ID.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupIdResponse500> Server Error
     */
    getApiV2UseraccessgroupId(metadata: types.GetApiV2UseraccessgroupIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2UseraccessgroupIdResponse200>>;
    /**
     * Deletes a user access group by its ID.
     *
     * @throws FetchError<400, types.DeleteApiV2UseraccessgroupIdResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UseraccessgroupIdResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UseraccessgroupIdResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UseraccessgroupIdResponse500> Server Error
     */
    deleteApiV2UseraccessgroupId(metadata: types.DeleteApiV2UseraccessgroupIdMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2UseraccessgroupIdResponse200>>;
    /**
     * Updates a user access group by its ID.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdResponse500> Server Error
     */
    putApiV2UseraccessgroupId(body: types.PutApiV2UseraccessgroupIdBodyParam, metadata: types.PutApiV2UseraccessgroupIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdResponse200>>;
    putApiV2UseraccessgroupId(metadata: types.PutApiV2UseraccessgroupIdMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdResponse200>>;
    /**
     * Retrieves user access groups by user ID.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupGetbyuseridIdResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupGetbyuseridIdResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupGetbyuseridIdResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupGetbyuseridIdResponse500> Server Error
     */
    getApiV2UseraccessgroupGetbyuseridId(metadata: types.GetApiV2UseraccessgroupGetbyuseridIdMetadataParam): Promise<FetchResponse<200, types.GetApiV2UseraccessgroupGetbyuseridIdResponse200>>;
    /**
     * Retrieves user access groups by a list of IDs.
     *
     * @throws FetchError<400, types.GetApiV2UseraccessgroupGetbylistResponse400> Bad Request
     * @throws FetchError<404, types.GetApiV2UseraccessgroupGetbylistResponse404> Not Found
     * @throws FetchError<422, types.GetApiV2UseraccessgroupGetbylistResponse422> Client Error
     * @throws FetchError<500, types.GetApiV2UseraccessgroupGetbylistResponse500> Server Error
     */
    getApiV2UseraccessgroupGetbylist(metadata?: types.GetApiV2UseraccessgroupGetbylistMetadataParam): Promise<FetchResponse<200, types.GetApiV2UseraccessgroupGetbylistResponse200>>;
    /**
     * Deletes user access groups by a list of IDs.
     *
     * @throws FetchError<400, types.DeleteApiV2UseraccessgroupDeletebylistResponse400> Bad Request
     * @throws FetchError<404, types.DeleteApiV2UseraccessgroupDeletebylistResponse404> Not Found
     * @throws FetchError<422, types.DeleteApiV2UseraccessgroupDeletebylistResponse422> Client Error
     * @throws FetchError<500, types.DeleteApiV2UseraccessgroupDeletebylistResponse500> Server Error
     */
    deleteApiV2UseraccessgroupDeletebylist(metadata?: types.DeleteApiV2UseraccessgroupDeletebylistMetadataParam): Promise<FetchResponse<200, types.DeleteApiV2UseraccessgroupDeletebylistResponse200>>;
    /**
     * Assigns users to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssignusersResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssignusersResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssignusersResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssignusersResponse500> Server Error
     */
    putApiV2UseraccessgroupIdAssignusers(metadata: types.PutApiV2UseraccessgroupIdAssignusersMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdAssignusersResponse200>>;
    /**
     * Unassigns users from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassignusersResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassignusersResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassignusersResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassignusersResponse500> Server Error
     */
    putApiV2UseraccessgroupIdUnassignusers(metadata: types.PutApiV2UseraccessgroupIdUnassignusersMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdUnassignusersResponse200>>;
    /**
     * Assigns assets to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssignassetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssignassetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssignassetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssignassetsResponse500> Server Error
     */
    putApiV2UseraccessgroupIdAssignassets(metadata: types.PutApiV2UseraccessgroupIdAssignassetsMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdAssignassetsResponse200>>;
    /**
     * Unassigns assets from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassignassetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassignassetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassignassetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassignassetsResponse500> Server Error
     */
    putApiV2UseraccessgroupIdUnassignassets(metadata: types.PutApiV2UseraccessgroupIdUnassignassetsMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdUnassignassetsResponse200>>;
    /**
     * Assigns systems to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssignsystemsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssignsystemsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssignsystemsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssignsystemsResponse500> Server Error
     */
    putApiV2UseraccessgroupIdAssignsystems(metadata: types.PutApiV2UseraccessgroupIdAssignsystemsMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdAssignsystemsResponse200>>;
    /**
     * Unassigns systems from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse500> Server Error
     */
    putApiV2UseraccessgroupIdUnassignsystems(metadata: types.PutApiV2UseraccessgroupIdUnassignsystemsMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdUnassignsystemsResponse200>>;
    /**
     * Assigns cabinets to a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse500> Server Error
     */
    putApiV2UseraccessgroupIdAssigncabinets(metadata: types.PutApiV2UseraccessgroupIdAssigncabinetsMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdAssigncabinetsResponse200>>;
    /**
     * Unassigns cabinets from a user access group.
     *
     * @throws FetchError<400, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse400> Bad Request
     * @throws FetchError<404, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse404> Not Found
     * @throws FetchError<422, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse422> Client Error
     * @throws FetchError<500, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse500> Server Error
     */
    putApiV2UseraccessgroupIdUnassigncabinets(metadata: types.PutApiV2UseraccessgroupIdUnassigncabinetsMetadataParam): Promise<FetchResponse<200, types.PutApiV2UseraccessgroupIdUnassigncabinetsResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
