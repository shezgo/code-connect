/**
 * This module contains S3 Storage functions.
 * 
 * To use these services you need to set these .env variables
 * 
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY
 * S3_REGION
 * S3_BUCKET
 */

require('dotenv').config();

const { PutObjectCommand, GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
const mime = require('mime');


const create_file_key = (options) => {
    /**
     * Create entity Unique Key.
     * @description
     * This function hashes file parameters with sha256
     * to ensure no replication in the S3 Bucket.
     * 
     * @param {Object} options
     * @param {Number} options.entity_id Unique id of the entity related to the file.
     * @param {String} options.entity_type Type of the entity related to the file like user/post.
     * @param {String} options.file_type Type of the file like profile picture of a user.
     * @param {Number} options.file_version Version of this file 
     * - 1: Use 1 always if no replication allowed
     * - current_version: Current file version in database, use an incremental value to track uploads or number of files 
     * 
     * @return {string} Return unique hash for file.
     */
    const { entity_id, entity_type, file_type, file_version } = options;
    const file_key = `${entity_id}_${entity_type}_${file_type}_${file_version}`;
    const hash = crypto.createHash("sha256");
    hash.update(file_key);
    return hash.digest("hex");
};



const create_put_presigned_url = async (options) => {
    /**
     * Create an S3 bucket file presigned put URL.
     * 
     * @description
     * This function generates a short time URL to 
     * allow user client to upload this single object, if already exists it will overwrite it.
     * 
     * @link https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
     * 
     * @param {Object} options
     * @param {String} options.region Region of the S3 bucket.
     * @param {String} options.bucket AWS Bucket name.
     * @param {String} options.key Unique key for this file.
     * @param {String} options.content_type Type of the file to upload.
     * @param {Number} options.expires_in Time to expire URL in seconds.
     * 
     * @return {Promise<String>} Return Presigned URL to upload a file.
     */
    const { region, bucket, key, content_type, expires_in } =  options;
    const client = new S3Client({ region });
    const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: content_type });
    return await getSignedUrl(client, command, { expiresIn: expires_in });
};

const create_get_presigned_url = async (options) => {
    /**
     * Create an S3 bucket file presigned get URL.
     * 
     * This function generates a short time URL to 
     * allow user client to download this single object.
     * 
     * @link https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
     * 
     * @param {Object} options
     * @param {String} options.region Region of the S3 bucket, if not set it will use env variable S3_REGION.
     * @param {String} options.bucket AWS Bucket name, if not set it will use env variable S3_BUCKET.
     * @param {String} options.key Unique key for this file.
     * @param {Number} options.expires_in Time to expire URL in seconds.
     * 
     * @return {Promise<String>} Return Presigned URL to get a file.
     */
    const { region, bucket, key, expires_in } = options;
    const client = new S3Client({ region: region });
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return await getSignedUrl(client, command, { expiresIn: expires_in });
};

const default_s3file = {
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET
}

class EntityS3Files {

    constructor(options) {
        /**
         * constructor for S3File.
         * 
         * @param {Object} options
         * @param {Number} options.entity_id Unique id of the entity related to the file.
         * @param {String} options.entity_type Type of the entity related to the file like user/post.
         * @param {String} [options.region=] Optional region of the S3 bucket, if not set it will use env variable S3_REGION.
         * @param {String} [options.bucket=] Optional AWS Bucket name, if not set it will use env variable S3_BUCKET.
         * 
         * @return {S3File} Return S3File object.
        */
        //Assign this object with the pass options and use default values if they are optional
        Object.assign(this, default_s3file, options)
    }
    async get_file_download_url(file_type, file_version = 1, expires_in=120) {
        /*
         * @param {String} file_type Type of the file like profile picture of a user.
         * @param {Number} [file_version=1] Optional version of this file
         * @param {Number} [expires_in=120] Optional time to expire URL in seconds.
         */
        const file_key = create_file_key({ 
            entity_id: this.entity_id, 
            entity_type: this.entity_type, 
            file_type: file_type, 
            file_version: file_version });
        
        return await create_get_presigned_url({
            region: this.region,
            bucket: this.bucket,
            key: file_key,
            expires_in: expires_in
        })
    }

    async get_file_upload_url(file_type, file_name, file_version = 1, expires_in=120) {
        /*
         * @param {String} file_type Type of the file like profile picture of a user.
         * @param {String} file_name Name of the file with extension.
         * @param {Number} [file_version=1] Optional version of this file
         * @param {Number} [expires_in=120] Optional time to expire URL in seconds.
         * 
         * @Returns {Object}
         * 
         */
        const file_key = create_file_key({ 
            entity_id: this.entity_id, 
            entity_type: this.entity_type, 
            file_type: file_type, 
            file_version: file_version });
      
        const content_type = mime.getType(file_name);
        console.log(content_type)
        return  {
            upload_url: await create_put_presigned_url({
                                    region: this.region,
                                    bucket: this.bucket,
                                    key: file_key,
                                    content_type: content_type,
                                    expires_in: expires_in
                                }), 
            content_type:content_type,
            key:file_key};
    }
        
}

module.exports = {EntityS3Files};