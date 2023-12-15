const express = require("express");
const userProject = require("../models/projects.js");
const generateEmbeddings = require("../utils/embeddings.js");
const semanticSearch = require("../utils/semanticSearch.js");

const router = express.Router();
router.post('/check', async (req, res) => {
    try {
        const { ideaTitle, domain,field, ideaDescription, github, youtube, mentorId, author } = req.body;

        // Check if any required field is missing
        const requiredFields = ['ideaTitle',  'domain', 'field','ideaDescription','github'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.json({ message: 'fields are required', missingFields });
        }

        const embeddings = await generateEmbeddings({ ideaTitle, domain, field, ideaDescription, github, youtube, mentorId });
        // console.log(embeddings);

        const searchResults = await semanticSearch(embeddings);
        // Filter projects with a score greater than 0.7
        const highScoreProjects = searchResults.filter(result => result.score > 0.7);
        if (highScoreProjects.length===0){
            const newProject = new userProject({ ideaTitle, domain, field, ideaDescription, github, youtube, mentorId, embeddings, author });
            console.log(newProject);
            const savedProject = await newProject.save();
            res.json({
                message: 'Project Uploaded successfully.',
                data: savedProject
            });
        }
        else{
            res.json({message: "Similarity score is high .",
            data:highScoreProjects
        });
        }
    } catch (error) {
        console.error('Error during Uploading:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
