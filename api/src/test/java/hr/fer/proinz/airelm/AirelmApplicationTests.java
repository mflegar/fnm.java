package hr.fer.proinz.airelm;

import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import hr.fer.proinz.airelm.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

@SpringBootTest
class AirelmApplicationTests {

	@Autowired
	ProjectService projectService;
	@Test
	void contextLoads() {
		List<ProjectDTO> projects = projectService.getProjectsByActor(25);
		assertThat(projects.size()).isEqualTo(1);
		projects = projectService.getProjectsByInstitution(0);
		assertThat(projects.size()).isEqualTo(1);
	}

}
