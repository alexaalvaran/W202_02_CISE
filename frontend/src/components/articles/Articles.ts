export type Article = {
    _id?: string;
    title?:string;
    authors?: string;
    sources?:string;
    pubyear?:string;
    email?:string;
    doi?: string;
    claim?: string;
    evidence?:string;
};

export const DefaultArticle: Article = {
    _id: undefined,
    title: '',
    authors: '',
    sources: '',
    pubyear: '',
    email:'',
    doi:'',
    claim:'',
    evidence:'',
}

export const mockResults: Article[] = [
    { _id: "1", title: "Sample Article 1", authors: "John Doe", pubyear: "2023", doi: "10.1234/sample1", claim: "Claim 1", evidence: "Evidence 1" },
    { _id: "2", title: "Sample Article 1", authors: "John Smith", pubyear: "2023", doi: "10.1234/sample2", claim: "Claim 2", evidence: "Evidence 2" },
    { _id: "3", title: "Sample Article 2", authors: "John Doe", pubyear: "2022", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" },
    { _id: "4", title: "Sample Article 2", authors: "John Smith", pubyear: "2022", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" },
    { _id: "5", title: "Sample Article 3", authors: "Will Smith", pubyear: "2024", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" },
    { _id: "6", title: "Sample Article 3", authors: "Wise Smith", pubyear: "2024", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" },
    { _id: "7", title: "Sample Article 4", authors: "Will Doe", pubyear: "2021", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" },
    { _id: "8", title: "Sample Article 4", authors: "Wise Doe", pubyear: "2021", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" },
    { _id: "9", title: "Sample Article 5", authors: "John Smith", pubyear: "2020", doi: "10.1234/sample3", claim: "Claim 3", evidence: "Evidence 3" }

];