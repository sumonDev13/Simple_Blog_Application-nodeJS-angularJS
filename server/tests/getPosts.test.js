import { getAllPosts } from '../controller/blogController.js';
import * as blogStore from '../models/blogStore.js';
import httpMocks from 'node-mocks-http';
import StatusCodes from 'http-status-codes';

jest.mock('../models/blogStore');

describe('getAllPosts', () => {
    it('should return all posts with status code 200', () => {
        const mockPosts = [
            { id: 1, title: 'Post 1', content: 'Content 1' },
            { id: 2, title: 'Post 2', content: 'Content 2' }
        ];
        blogStore.getAllPosts.mockReturnValue(mockPosts);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        getAllPosts(req, res, next);

        expect(res.statusCode).toBe(StatusCodes.OK);
        expect(res._getJSONData()).toEqual({
            statusCode: StatusCodes.OK,
            message: 'Get all posts successfully',
            post: mockPosts
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors', () => {
        const errorMessage = 'Error fetching posts';
        blogStore.getAllPosts.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        getAllPosts(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: errorMessage }));
    });
});
