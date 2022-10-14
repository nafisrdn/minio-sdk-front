import axios from "axios";
import Store from "../store";
import { setError } from "../store/MinIOActions";
import { API_HOST, API_PORT } from "../config";

export const URL = `${API_HOST}:${API_PORT}`;

export const getBucketsUrl = () => `${URL}/bucket`;
export const getBucketObjectsUrl = (bucketName) =>
  `${URL}/bucket/${bucketName}`;

export const getBuckets = async () => {
  try {
    const res = await axios.get(getBucketsUrl());
    return res;
  } catch (error) {
    const { data, status } = error.response;

    Store.dispatch(setError(data, status));

    throw error;
  }
};

export const getBucketObjects = async (bucketName) => {
  try {
    const res = await axios.get(getBucketObjectsUrl(bucketName));

    return res;
  } catch (error) {
    const { data, status } = error.response;

    Store.dispatch(setError(data, status));

    throw error;
  }
};

export const deleteBucketObject = async (bucketName, objectName) => {
  try {
    const res = await axios.delete(getBucketObjectsUrl(bucketName), {
      data: { objectName: objectName },
    });

    return res;
  } catch (error) {
    const { data, status } = error.response;

    Store.dispatch(setError(data, status));

    throw error;
  }
};