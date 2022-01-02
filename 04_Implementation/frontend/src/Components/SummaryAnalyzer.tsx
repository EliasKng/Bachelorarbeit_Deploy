import {Component} from 'react';

interface SummaryAnalyzerProps {
	summary: string,
}
// TODO make sure this is only used when the user is not writing anymore (e.g. focus lost of Summary)
class SummaryAnalyzer extends Component<SummaryAnalyzerProps> {
	constructor(props) {
		super(props);
	}

}