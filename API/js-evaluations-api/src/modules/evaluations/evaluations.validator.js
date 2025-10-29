module.exports = {
    validateEvaluationData: (data) => {
        const errors = [];
        
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string.');
        }
        
        if (!data.description || typeof data.description !== 'string') {
            errors.push('Description is required and must be a string.');
        }
        
        if (data.grade !== undefined && (typeof data.grade !== 'number' || data.grade < 0 || data.grade > 100)) {
            errors.push('Grade must be a number between 0 and 100.');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
};