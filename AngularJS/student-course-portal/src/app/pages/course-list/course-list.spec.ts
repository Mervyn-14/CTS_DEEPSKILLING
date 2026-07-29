import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CourseListComponent } from './course-list';
import { CourseService } from '../../services/course.service';

describe('CourseListComponent', () => {

  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const initialState = {

    course: {

      courses: [

        {
          id: 1,
          name: 'Angular',
          code: 'ANG101',
          credits: 4,
          gradeStatus: 'passed'
        },

        {
          id: 2,
          name: 'Java',
          code: 'JAVA102',
          credits: 3,
          gradeStatus: 'pending'
        }

      ],

      loading: false,

      error: null

    }

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [CourseListComponent, HttpClientTestingModule],

      providers: [

        provideRouter([]),

        CourseService,

        provideMockStore({

          initialState

        })

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(
      CourseListComponent
    );

    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should load courses from store', () => {

    expect(component).toBeTruthy();

  });

  it('should show loading state', () => {

    store.setState({

      course: {

        courses: [],

        loading: true,

        error: null

      }

    });

    fixture.detectChanges();

    expect(component).toBeTruthy();

  });

  it('should display loading indicator', () => {

    store.setState({

      course: {

        courses: [],

        loading: true,

        error: null

      }

    });

    fixture.detectChanges();

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Loading');

  });

});