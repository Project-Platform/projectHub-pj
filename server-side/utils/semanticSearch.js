// Import the Project model from the "../Models/project" module.
const Project = require("../models/projects");

// Async function for semantic search using vector indexing.
const semanticSearch = async (queryEmbedding) => {
    // Define an aggregation pipeline for MongoDB to perform semantic search.
    const aggregationPipeline = [
        {
            '$vectorSearch': {
                'index': 'vector_index',   // Name of the vector index to perform the search.
                'path': 'embeddings',      // Path to the embeddings field in the documents.
                'queryVector': queryEmbedding, // The vector used for the search.
                'numCandidates': 150,       // Maximum number of candidates to consider.
                'limit': 10                 // Limit the final result set to 10 documents.
            }
        },
        {
            '$project': {
                '_id': 1,                   // Include the document ID in the result.
                'ideaTitle': 1,                 // Include the document title in the result.
                'domain': 1,                // Include the document domain in the result.
                'field': 1,                 // Include the document field in the result.
                'mentorId':1,
                'universityId':1,         // Include the document universityId in the result.
                'author':1,
                'ideaDescription': 1,              // Include the document abstract in the result.
                'github':1,
                'youtube':1,
                'docs':1,
                'score': {                  // Include the search score in the result.
                    '$meta': 'vectorSearchScore'
                },
            }
        }
    ];

    // Execute the aggregation pipeline on the Project model.
    // The result is an array of documents matching the semantic search.
    result = await Project.aggregate(aggregationPipeline);

    // Return the result of the semantic search.
    return result;
}

// Export the semanticSearch function as the module export.
module.exports = semanticSearch;