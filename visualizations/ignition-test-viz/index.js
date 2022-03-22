import React from 'react';
import PropTypes from 'prop-types';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    
} from 'recharts';
import {Button, Card, CardBody, HeadingText, NrqlQuery, Spinner, AutoSizer} from 'nr1';
// import { Octokit } from "@octokit/rest"  
// export const octokit = new Octokit({     
//      auth: "",    
//      userAgent: 'skylight v1' 
// });

export default class IgnitionTestVizVisualization extends React.Component {
    // Custom props you wish to be configurable in the UI must also be defined in
    // the nr1.json file for the visualization. See docs for more details.
    constructor(props) {
        super(props);
        this.state = {
          response: null
        };

      }
     onClick = () => {
        const self = this
        console.log('clicked');
        // await octokit.request(
        //     'GET /repos/{owner}/{repo}/contents/{path}', {
        //        owner: 'jawblia',
        //        repo: 'components',
        //        path: `src/lib/components/${path}`,
        //  })
        fetch('https://api.publicapis.org/entries')
         .then(res => self.setState({response: res})).catch(err => console.log(err));
    }

    render() {
        
        const { response } = this.state;
        console.log(response);
        return (
            <Button onClick={this.onClick}>{response ? 'API Success' : 'Send API'}</Button>
        );
    }
}

const EmptyState = () => (
    <Card className="EmptyState">
        <CardBody className="EmptyState-cardBody">
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                Please provide at least one NRQL query & account ID pair
            </HeadingText>
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                type={HeadingText.TYPE.HEADING_4}
            >
                An example NRQL query you can try is:
            </HeadingText>
            <code>
                FROM NrUsage SELECT sum(usage) FACET metric SINCE 1 week ago
            </code>
        </CardBody>
    </Card>
);

const ErrorState = () => (
    <Card className="ErrorState">
        <CardBody className="ErrorState-cardBody">
            <HeadingText
                className="ErrorState-headingText"
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                Oops! Something went wrong.
            </HeadingText>
        </CardBody>
    </Card>
);
